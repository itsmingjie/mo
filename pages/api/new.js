import supabase from "./libs/_supabase";

/** endpoint to create a new note */
const router = async (req, res) => {
  const { content } = req.body;

  // extract tags from content
  const tags = extractTags(content);

  if (tags.length > 0) {
    const mappedTags = tags.map((tag) => ({ name: tag }));

    // 1. upsert tag in the tags database
    const { data: tagData, error: tagError } = await supabase
      .from("tags")
      .insert(mappedTags, { upsert: true });

    // if error, return error
    if (tagError) {
      res.status(500).json({ error: tagError });
      return;
    }
  }

  // 2. create a new note in the notes database
  const { data: noteData, error: noteError } = await supabase
    .from("notes")
    .insert({
      content,
    });

  // if error, return error
  if (noteError) {
    res.status(500).json({ error: noteError });
    return;
  }

  if (tags.length > 0) {
    // 3. create a new note-tag relationship in the tagmap database
    const { data: tagmapData, error: tagmapError } = await supabase
      .from("tagmap")
      .insert([
        ...tags.map((tag) => ({
          note_id: noteData[0].id,
          tag_name: tag,
        })),
      ]);

    // if error, return error
    if (tagmapError) {
      res.status(500).json({ error: tagmapError });
      return;
    }
  }

  // 4. return the note
  res.json({
    note: noteData,
  });
};

/**
    extract tags in format of "#tag" from content
    tags cannot contain spaces
    tags cannot contain special characters
    tags cannot be duplicated
    tags cannot be empty

    return an array of tags
*/
const extractTags = (content) => {
  const tags = [];
  const regex = /\B(?<!\\)(\#[a-zA-Z0-9-]+\b)/gm;

  // match
  let match;
  while ((match = regex.exec(content))) {
    const tag = match[0].slice(1); // strips the #

    if (tags.includes(tag)) {
      continue; // skip duplicates
    }

    tags.push(tag);
  }

  return tags;
};

module.exports = router;
