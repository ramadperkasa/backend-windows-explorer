export const formatResponse = (
  statusCode: number,
  message: string,
  data: any = null
) => {
  return new Response(JSON.stringify({ statusCode, message, data }), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
};
