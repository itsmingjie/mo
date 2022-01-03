// api to query tags based on the first few letters
import supabase from "./libs/_supabase";

const router = async (req, res) => {
    const { q } = req.query;
    
    const { data: tagData, error: tagError } = await supabase
        .from("tags")
        .select("name")
        .ilike("name", `${q}%`)
        .limit(5);
    
    if (tagError) {
        res.status(500).json({ error: tagError });
        return;
    }

    // flatten the object array
    const tags = tagData.reduce((acc, curr) => {
        acc.push(curr.name);
        return acc;
    }, []);
    
    res.json({
        tags,
    });
}

module.exports = router;
