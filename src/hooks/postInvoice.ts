const postInvoice = async (customerId: number, bookIds: number[]) => {
  const response = await fetch("http://localhost:38668/api/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      CustomerId: customerId,
      BooksIds: bookIds,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Network response was not ok");
  }

  return response.json();
};
export default postInvoice;
