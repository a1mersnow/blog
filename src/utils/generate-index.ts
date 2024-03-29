import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import dayjs from 'dayjs'

const postsDirectory = path.resolve(__dirname, '../pages/blogs')

export function generateIndex() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      date: dayjs(matterResult.data.date).format('YYYY-MM-DD'),
      tags: matterResult.data.tags ? matterResult.data.tags.split(',') : [],
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b)
      return 1
    else if (a > b)
      return -1
    else
      return 0
  })
}
