import pandas as pd
from data_loader import db

db["date"] = pd.to_datetime(db["date"])

def answer_question(question):

    question = question.lower()

    # 1. Highest revenue region in Q1 2024
    if "highest net revenue in q1 2024" in question:

        data = db[
            (db["date"].dt.year == 2024) &
            (db["date"].dt.quarter == 1)
        ]

        region = (
            data.groupby("region")
            ["net_revenue_usd"]
            .sum()
            .idxmax()
        )

        return f"{region} had the highest net revenue in Q1 2024"

    # 2. Gross profit margin for Snacks
    elif "gross profit margin for the snacks category" in question:

        snacks = db[
            db["category"] == "Snacks"
        ]

        revenue = snacks["net_revenue_usd"].sum()
        profit = snacks["gross_profit_usd"].sum()

        margin = (profit / revenue) * 100

        return f"Gross Profit Margin: {margin:.2f}%"

    # 3. Top sales rep in 2025
    elif "sales rep closed the most units in 2025" in question:

        data = db[
            db["date"].dt.year == 2025
        ]

        rep = (
            data.groupby("sales_rep")
            ["units_sold"]
            .sum()
            .idxmax()
        )

        units = (
            data.groupby("sales_rep")
            ["units_sold"]
            .sum()
            .max()
        )

        return f"{rep} closed the most units in 2025 with {units} units"

    # 4. Compare channels
    elif "e-commerce vs modern trade" in question:

        channels = db[
            db["channel"]
            .isin([
                "E-Commerce",
                "Modern Trade"
            ])
        ]

        result = (
            channels.groupby("channel")
            ["net_revenue_usd"]
            .sum()
        )

        return result.to_dict()

    # 5. Best product in West
    elif "best performing product in the west region" in question:

        west = db[
            db["region"] == "West"
        ]

        product = (
            west.groupby("product_name")
            ["net_revenue_usd"]
            .sum()
            .idxmax()
        )

        return f"Best Product in West: {product}"

    return "Question not supported"