

export const ApiDialogFlowWebHook = (req, res) => {
    const query = req.body.queryResult.queryText.toLowerCase();

  let responseText = "Sorry, I didn’t understand.";

  if (query.includes("goa")) {
    responseText = "The price for the Goa trip is ₹25,000 and it’s available in December!";
  } else if (query.includes("kerala")) {
    responseText = "Kerala trip costs ₹20,000 and available throughout the year!";
  } else if (query.includes("suggest")) {
    responseText = "I suggest you explore Goa, Kerala, or Manali. All are great choices!";
  }

  return res.json({
    fulfillmentText: responseText
  });
}