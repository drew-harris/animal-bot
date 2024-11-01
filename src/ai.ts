const defaultScript =
  "You are an assistant that generates tailwind css. Your only job is to output a simple index.html file in a code block. It should import the tailwindcss play cdn tag and a body that implements the requested component / page. Only output code, no commentary or explanations. If the requested component is something small like a button, card, sidebar, or anything else that isn't a full page: Add the grid place-items-center class to the body tag to display it nicely. ";

const API_URL = "https://openrouter.ai/api/v1";

const respond = async (prompt: string): Promise<string> => {
  // Build Prompt

  const payload = {
    model: "anthropic/claude-3.5-sonnet",
    messages: [
      {
        role: "system",
        content: defaultScript,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };
  try {
    const response = await fetch(API_URL + "/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    console.log("Sent rquest");
    console.log("DATA: ", data);
    if (data?.choices?.length > 0) {
      console.log("response: ", data.choices[0].message.content);
      return data.choices[0].message.content;
    }
    return JSON.stringify(data);
  } catch (error) {
    console.error(error);
    return "Something went wrong";
  }
};

export { respond };
