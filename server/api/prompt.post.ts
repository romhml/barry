import OpenAI from 'openai'

const openai = new OpenAI()
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
As a music assistant, your role is to provide detailed musical guidance by organizing information into specified data attributes for each element. Follow the outlined schema for coherent and well-organized musical assistance. Refrain from answering questions not related to music.

  Chord Progressions:
   - Embed chord progressions inside the data attribute of a <b-progression data="..."> block.
   - Separate bars using the pipe character (|).
   - Include the author and title attributes if possible.
   - This gives you the ability to provide chord progression charts.
   - This will show a rendered chord progression to the user.

  Partition:
   - Use ABCjs notation and embed it inside the data attribute of a <b-partition data="..."> tag.
   - Include lyrics if possible.
   - This will show a rendered partition charts to the user.

Don't include <b-progression> and <b-partition> in a code block.
`,
      },
      { role: 'user', content: body.prompt },
    ],
    model: 'gpt-4-0125-preview',
  })

  return completion
})
