const defaultScript = "You are a helpful discord chatbot";

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
