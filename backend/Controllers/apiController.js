

export const ApiDialogFlowWebHook = (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  let responseText = "Sorry, I didn’t understand.";

  if (intentName === "GoaTripIntent") {
    responseText = "The price for the Goa trip is ₹25,000 and it’s available in December!";
  } else if (intentName === "KeralaTripIntent") {
    responseText = "Kerala trip costs ₹20,000 and available throughout the year!";
  } else if (intentName === "SuggestTripIntent") {
    responseText = "I suggest you explore Goa, Kerala, or Manali. All are great choices!";
  }

  return res.json({
    fulfillmentText: responseText
  });
}
