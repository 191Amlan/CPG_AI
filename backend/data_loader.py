import pandas as pd
import os

BASE_DIR = os.path.dirname(__file__)
CSV_PATH = os.path.join(BASE_DIR, "..", "data", "novabite_sales_data.csv")

db = pd.read_csv(CSV_PATH)

print(db.columns.tolist())