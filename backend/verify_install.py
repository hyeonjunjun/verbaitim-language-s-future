import sys
import importlib

packages = [
    "fastapi",
    "uvicorn",
    "librosa",
    "ffmpeg",
    "pydub",
    "torch",
    "transformers",
    # "allosaurus", # specific import check might differ
    "psycopg2",
    "pgvector",
    "pydantic",
    "boto3",
    "supabase",
    "websockets",
    "numpy"
]

print(f"Python version: {sys.version}")

failed = []
for package in packages:
    try:
        importlib.import_module(package)
        print(f"✅ {package} imported successfully")
    except ImportError as e:
        print(f"❌ {package} failed to import: {e}")
        failed.append(package)

# Special check for allosaurus as it might be 'allosaurus' or something else
try:
    import allosaurus
    print("✅ allosaurus imported successfully")
except ImportError:
    print("❌ allosaurus failed to import")
    failed.append("allosaurus")

if failed:
    print(f"\nFailed packages: {', '.join(failed)}")
    sys.exit(1)
else:
    print("\nAll packages installed successfully!")
    sys.exit(0)
