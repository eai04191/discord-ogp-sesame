import { Client, TextChannel } from "discord.js";
import { stripHtml } from "string-strip-html";
import { fetch } from "./pixiv";
import { post } from "./webhook";

import * as dotenv from "dotenv";
dotenv.config();

const config = {
    suppressOriginalEmbeds:
        Boolean(process.env.SUPRESS_ORIGINAL_EMBED) || false,
};

const client = new Client();

client.on("ready", () => {
    console.log("Discord Bot is Ready!");
    client.user.setActivity("github.com/eai04191/discord-ogp-sesame");
});

// どこかのチャンネルにメッセージが投稿されたら
client.on("message", async (message) => {
    // テキストチャンネルじゃないなら無視
    if (!(message.channel instanceof TextChannel)) return;
    // 内容がpixivのURLじゃないなら無視
    if (!/https:\/\/www\.pixiv\.net\/artworks\/\d+/.test(message.content)) {
        return;
    }
    // 作品IDを取る
    const artworkId = Number(
        message.content.match(/artworks\/(?<id>\d+)/).groups.id
    );
    if (!artworkId) return;

    const data = await fetch(artworkId);
    const content = { username: "OGP Sesame", embeds: [] };

    // 先頭4ページ分画像URLをpushする
    [...Array(data.body.pageCount)].slice(0, 4).map((_, page) => {
        console.log(page);
        content.embeds.push({
            url: data.body.extraData.meta.canonical,
            image: {
                url: data.body.urls.small
                    .replace("pximg.net", "pixiv.cat")
                    .replace("p0", `p${page}`),
            },
        });
    });
    // その他の情報をつける
    content.embeds[0].title = data.body.title;
    content.embeds[0].color = parseInt("0096FA", 16);
    content.embeds[0].description = Array.from(
        stripHtml(data.body.description.replace("<br>", "\n")).result
    )
        .slice(0, 80)
        .join("");
    content.embeds[0].author = {
        name: data.body.userName,
        url: "https://www.pixiv.net/users/" + data.body.userId,
    };
    console.log(content);
    console.log(content.embeds);
    await post(content);

    config.suppressOriginalEmbeds && (await message.suppressEmbeds(true));
});

client.login(process.env.DISCORD_TOKEN);
