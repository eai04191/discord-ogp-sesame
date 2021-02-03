import got from "got";

export const post = async (content: any) => {
    const url = process.env.WEBHOOK_URL;
    if (!url) throw new Error("env WEBHOOK is not set");
    const { body } = await got.post(url, {
        json: content,
        responseType: "json",
    });
    console.log(body);
};
