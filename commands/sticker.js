export const sticker = (file_id) => (ctx) => {
  ctx.replyWithSticker(file_id);
}