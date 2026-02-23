import sys
import importlib

core_packages = [
    "fastapi",
    "uvicorn",
    "psycopg2",
    "pgvector",
    "pydantic",
    "boto3",
    "supabase",
    "websockets",
    "numpy"
]

ml_packages = [
    "librosa",
    "pydub",
    "torch",
    "transformers",
    "allosaurus"
]

print(f"Python version: {sys.version}")

failed_core = []
for package in core_packages:
    try:
        importlib.import_module(package)
        print(f"[OK] {package} imported successfully")
    except ImportError as e:
        print(f"[FAIL] {package} (CORE) failed to import: {e}")
        failed_core.append(package)

print("\n--- Optional ML Dependencies (Full Mode) ---")
ml_available = []
for package in ml_packages:
    try:
        importlib.import_module(package)
        print(f"[OK] {package} is available")
        ml_available.append(package)
    except ImportError:
        print(f"[-] {package} is not installed (Lite Mode active)")

if failed_core:
    print(f"\n❌ FAILED: Core packages missing: {', '.join(failed_core)}")
    sys.exit(1)
else:
    mode = "FULL" if len(ml_available) == len(ml_packages) else "LITE"
    print(f"\n✅ SUCCESS: Core dependencies healthy. Backend running in {mode} mode.")
    sys.exit(0)
