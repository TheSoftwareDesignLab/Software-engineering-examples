import os
import time

import requests
from flask import Flask, jsonify

app = Flask(__name__)

ROLE = os.environ.get("ROLE", "frontend")
PORT = int(os.environ.get("PORT", "8080"))
PAYMENTS_URL = os.environ.get("PAYMENTS_URL", "http://payments:8081")
API_URL = os.environ.get("API_URL", "http://api:8080")
PAYMENTS_TIMEOUT_MS = int(os.environ.get("PAYMENTS_TIMEOUT_MS", "400"))
PAYMENTS_RETRIES = int(os.environ.get("PAYMENTS_RETRIES", "0"))
PAYMENT_DELAY_MS = int(os.environ.get("PAYMENT_DELAY_MS", "0"))


@app.get("/health")
def health():
    return jsonify({"status": "ok", "role": ROLE}), 200


if ROLE == "payments":

    @app.post("/charge")
    def charge():
        if PAYMENT_DELAY_MS > 0:
            time.sleep(PAYMENT_DELAY_MS / 1000.0)
        return jsonify({"status": "ok", "charged": True}), 200


elif ROLE == "api":

    @app.post("/pay")
    def pay():
        timeout_s = PAYMENTS_TIMEOUT_MS / 1000.0
        attempts = PAYMENTS_RETRIES + 1
        last_error = None

        for _ in range(attempts):
            try:
                response = requests.post(
                    f"{PAYMENTS_URL}/charge",
                    json={"amount": 10},
                    timeout=timeout_s,
                )
                if response.ok:
                    return jsonify({"status": "paid", "payments": response.json()}), 200
                last_error = f"payments_status_{response.status_code}"
            except requests.RequestException as exc:
                last_error = str(exc)

        return jsonify({"status": "error", "detail": last_error}), 500


else:  # frontend

    @app.get("/")
    def index():
        return jsonify({"service": "frontend", "status": "ok"}), 200

    @app.get("/checkout")
    def checkout():
        try:
            response = requests.post(f"{API_URL}/pay", timeout=5)
            return jsonify(
                {
                    "checkout": "ok" if response.ok else "failed",
                    "api": response.json(),
                }
            ), response.status_code
        except requests.RequestException as exc:
            return jsonify({"checkout": "failed", "detail": str(exc)}), 502


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
