"""Local dev server with no-cache headers so CSS/JS updates show on refresh."""
import ctypes
import os
import signal
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class DevHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


class DevServer(ThreadingHTTPServer):
    allow_reuse_address = True
    daemon_threads = True
    block_on_close = False


def _pid_is_alive(pid):
    if not pid:
        return False
    if os.name != "nt":
        try:
            os.kill(pid, 0)
            return True
        except OSError:
            return False

    kernel32 = ctypes.windll.kernel32
    synchronize = 0x00100000
    wait_timeout = 0x00000102
    handle = kernel32.OpenProcess(synchronize, False, int(pid))
    if not handle:
        return False
    try:
        return kernel32.WaitForSingleObject(handle, 0) == wait_timeout
    finally:
        kernel32.CloseHandle(handle)


def _launcher_pids():
    pids = []
    for key in ("SELECTOR_SERVER_PARENT", "SELECTOR_SERVER_ANCESTOR"):
        raw = os.environ.get(key, "").strip()
        if raw.isdigit():
            pids.append(int(raw))
    return pids


def _watch_launchers(httpd):
    pids = _launcher_pids()
    if not pids:
        return

    def watch():
        while True:
            time.sleep(1.0)
            if any(not _pid_is_alive(pid) for pid in pids):
                print("\nLauncher closed; stopping local server.")
                httpd.shutdown()
                return

    threading.Thread(target=watch, daemon=True).start()


if __name__ == "__main__":
    port = 8765
    with DevServer(("127.0.0.1", port), DevHandler) as httpd:
        stopping = {"value": False}

        def stop_server(signum=None, frame=None):
            if stopping["value"]:
                return
            stopping["value"] = True
            print("\nStopping local server...")
            threading.Thread(target=httpd.shutdown, daemon=True).start()

        signal.signal(signal.SIGINT, stop_server)
        signal.signal(signal.SIGTERM, stop_server)
        if hasattr(signal, "SIGBREAK"):
            signal.signal(signal.SIGBREAK, stop_server)

        print(f"Serving AI_for_PE_Algorithm_Selector at http://127.0.0.1:{port}/")
        print("Press Ctrl+C or close the launcher window to stop.")
        _watch_launchers(httpd)
        try:
            httpd.serve_forever(poll_interval=0.2)
        finally:
            httpd.server_close()
            print("Server stopped; port released.")
