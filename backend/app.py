from flask import Flask, jsonify, request
from flask_cors import CORS
from chatbot import answer_question
from data_loader import db

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

@app.route("/")
def home():
    return jsonify({"message": "NovaBite AI API Running"})

@app.route("/api/summary")
def summary():

    total_revenue = db["net_revenue_usd"].sum()

    gross_profit = db["gross_profit_usd"].sum()

    gpm = (
        gross_profit /
        total_revenue
    ) * 100

    top_region = (
        db.groupby("region")
        ["net_revenue_usd"]
        .sum()
        .idxmax()
    )

    return jsonify({
        "total_revenue": float(total_revenue),
        "gross_profit_margin": round(gpm, 2),
        "top_region": top_region
    })

@app.route("/api/trends")
def trends():

    monthly = (
        db.groupby("month")
        ["net_revenue_usd"]
        .sum()
        .reset_index()
    )

    return jsonify(
        monthly.to_dict(orient="records")
    )    

@app.route("/api/chat", methods=["POST"])
def chat():

    try:
        data = request.get_json(force=True)

        print("Question:", data)

        answer = answer_question(data["question"])

        return jsonify({
            "answer": answer
        })

    except Exception as e:

        print("ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500
        
if __name__ == "__main__":
    app.run(debug=True)