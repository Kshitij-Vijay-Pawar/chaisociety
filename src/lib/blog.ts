export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Culture' | 'Craft' | 'Food' | 'People';
  author: string;
  date: string;
  readTime: string;
  image: string;
  alt: string;
  featured?: boolean;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-quiet-art-of-brewing-chai',
    title: 'The Quiet Art of Brewing Chai',
    excerpt:
      'Why a single cup of masala chai carries four generations of memory, spice and slow mornings.',
    category: 'Craft',
    author: 'Aanya Mehta',
    date: '2026-09-12',
    readTime: '6 min',
    image: 'https://images.pexels.com/photos/5947062/pexels-photo-5947062.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
    alt: 'Ceramic mug of masala chai with star anise and cinnamon',
    featured: true,
    content: [
      'There is a sound every chai wallah knows — the low whistle of milk climbing the rim of a steel pot, the moment before it spills. It is the sound of patience being rewarded.',
      'At Chai Society we brew our chai the long way. Assam CTC leaves are brought to a rolling boil with crushed green cardamom, a thumb of ginger, and a single clove. The milk is added in two pours: the first to soften the tannin, the second to crown it with froth.',
      'The result is a cup that tastes of morning. Of kitchen windows and folded newspapers. Of a grandmother who measured nothing and got everything right.',
      'We serve it in a small glass — a cutting, as Mumbai calls it — because the first sip is always the best, and the second is a chance to remember the first.',
    ],
  },
  {
    slug: 'matcha-is-not-a-trend',
    title: 'Matcha Is Not A Trend. It Is A Discipline.',
    excerpt:
      'From Uji to our counter, the ceremonial green tea that asks for your attention, not your Instagram.',
    category: 'Craft',
    author: 'Kenji Mori',
    date: '2026-08-28',
    readTime: '5 min',
    image: 'https://images.pexels.com/photos/9309995/pexels-photo-9309995.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
    alt: 'Iced matcha latte with vibrant layers',
    content: [
      'A bowl of matcha is made of two things: powder and attention. The powder is stone-ground over an hour for a single tin. The attention is yours.',
      'We whisk ours with a chasen — a hundred thin bamboo prongs — until the surface holds a foam as fine as cream. The water is never boiling. The cup is always warmed.',
      'Drink it in three sips. The first is vegetal, almost grassy. The second opens into sweetness. The third is where the caffeine meets the L-theanine and you feel, briefly, very awake and very still.',
    ],
  },
  {
    slug: 'the-irani-cafe-and-the-bun-maska',
    title: 'The Irani Café & The Bun Maska',
    excerpt:
      'A small, buttered history of the bun maska — the cheapest luxury in the city, and the best one.',
    category: 'Culture',
    author: 'Rohan Patel',
    date: '2026-08-10',
    readTime: '7 min',
    image: 'https://images.pexels.com/photos/17850150/pexels-photo-17850150.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
    alt: 'Freshly baked buns, eggs and butter from above',
    content: [
      'In the 1930s, Bombay had more than three hundred Irani cafés. They sold cheap tea, cheaper buns, and the kind of democracy a city runs on: anyone could sit, anyone could stay.',
      'The bun maska was the centre of it. A soft pao, halved, toasted on a flat grill, and given a layer of salted butter so thick it left a shine on your fingers. You ate it with a cutting chai, and you read the paper, and the morning did its job.',
      'We make ours the same way. The butter is Amul. The jam is homemade. The chair is yours for as long as you want it.',
    ],
  },
  {
    slug: 'a-table-for-six',
    title: 'A Table For Six, An Hour For Nothing',
    excerpt:
      'On the small social ritual of sitting too long at a café with the people you love most.',
    category: 'People',
    author: 'Sara Nair',
    date: '2026-07-22',
    readTime: '4 min',
    image: 'https://images.pexels.com/photos/36729772/pexels-photo-36729772.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
    alt: 'Four friends sharing a fun moment over coffee',
    content: [
      'The best tables at Chai Society are the ones that stay full for two hours and order almost nothing.',
      'They are not our most profitable guests. They are our most important ones. A café is not a restaurant — it is a room a city lends you to do nothing in, together.',
      'Bring six people. Order one chai each. Let the conversation wander. We will refill the water without being asked.',
    ],
  },
  {
    slug: 'why-we-roast-our-own-coffee',
    title: 'Why We Roast Our Own Coffee',
    excerpt:
      'A small drum, a slow flame, and the difference between coffee that is fresh and coffee that is alive.',
    category: 'Craft',
    author: 'Diego Alvarez',
    date: '2026-07-01',
    readTime: '6 min',
    image: 'https://images.pexels.com/photos/5689498/pexels-photo-5689498.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
    alt: 'Barista creating latte art with a red milk pitcher',
    content: [
      'Coffee has a shelf life most cafés never tell you about. Two weeks after roasting, the volatile aromatics that make a cup interesting have already begun to fade.',
      'We roast in small batches on a 5kg drum, three times a week. The beans rest for four days before they reach the grinder, and we brew them within a month of the roast date printed on the bag.',
      'It is more work. It tastes like more, too.',
    ],
  },
  {
    slug: 'the-society-supper-club',
    title: 'The Society Supper Club',
    excerpt:
      'Once a month we close the counter, lay a long table, and feed forty strangers until they are friends.',
    category: 'Food',
    author: 'Aanya Mehta',
    date: '2026-06-15',
    readTime: '5 min',
    image: 'https://images.pexels.com/photos/3184177/pexels-photo-3184177.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400',
    alt: 'Friends and family enjoying a meal together',
    content: [
      'The supper club began on a rainy Tuesday with seven no-shows and one long table. We cooked too much. We ate too long. We have not stopped since.',
      'Once a month we close the counter at sundown, lay a single table for forty, and serve four courses of the food we would cook for our own families. No menus. No phones. Strangers sit beside strangers.',
      'By the third course, they are no longer strangers.',
    ],
  },
];

export const blogCategories = ['All', 'Culture', 'Craft', 'Food', 'People'] as const;
