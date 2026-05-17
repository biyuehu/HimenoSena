const getBiliUsername = async (uid: number | string) => {
  const res = await fetch(`https://space.bilibili.com/${uid}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/136.0.0.0 Safari/537.36'
    }
  })

  const html = await res.text()

  const match = html.match(/<title>(.*?)的个人空间/s)

  if (!match) {
    throw new Error('User not found')
  }

  return match[1].trim()
}

console.log(await getBiliUsername(2))
