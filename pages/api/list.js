import supabase from "./libs/_supabase";

// endpoint to list notes paginated
const router = async (req, res) => {
  const { page, size } = req.query;

  const from = page ? page * size : 0;
  const to = page ? from + size : size;

  const { data, error, count } = await supabase
    .from("notes")
    .select("*", { count: "exact" })
    .order("time_created", { ascending: false })
    .range(from, to);

  if (error) {
    res.status(500).json({ error });
    return;
  }

  res.json({
    data: data,
    count: count,
    page: +page,
  });
};

module.exports = router;
