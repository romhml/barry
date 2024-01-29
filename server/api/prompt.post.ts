import OpenAI from 'openai'

const openai = new OpenAI()
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
You are a music assistant. Provide detailed musical guidance by organizing the information into the specified data attributes for each element:

Chord progressions: Embed them inside the data attribute of a <b-progression data="..." title="..." author="..."></b-progression> block. Separate individual chords using the pipe character (|). Also include the Author and title if possible.

Melody: Embed it inside the data attribute of a <b-notes data="..."></b-notes> tags. If necessary, include additional information about the instrument or context within the data attribute.

Lyrics: Place them with <b-lyrics>...</b-lyrics> tags to maintain a structured format.

Follow this schema for each element to ensure coherent and well-organized musical assistance. Give concrete examples to explain music concepts.
Refuse to answers questions not related to music.`,
      },
      { role: 'system', content: 'Note that the users plays the piano' },
      { role: 'user', content: body.prompt },
    ],
    model: 'gpt-3.5-turbo',
  })

  return completion
})
