export interface Book {
  title: string;
  author: string;
  cover: string;
  shortText: string;
  extendedText: string | null;
}

export const books: Book[] = [
  {
    title: 'Ruling Your World: Ancient Strategies for Modern Life',
    author: 'Sakyong Mipham Rinpoche',
    cover: '/images/books/rulingyourworld.jpg',
    shortText:
      "You're stuck in the airport security line, late for a flight. The line isn't moving. You're angry at the security personnel for taking so long, you're irritated at the other passengers for having so much stuff, you're mad at your boss for sending you on this trip in the first place. By the time you get to your gate you're deflated and exhausted. Then someone cuts in front of you in the line to board and you snap. \"There's a line, you know!\" Is that really you, standing in an airport, yelling at a stranger, emotions raging? It happens to most of us more than we'd like to admit.",
    extendedText:
      'Something sets us off and, in an instant, our lives suddenly seem out of control and overwhelming. But what if you could approach every part of your life — from the smallest decisions to life\'s biggest setbacks — with total confidence, clarity, and control? Actually, we all have that power. The secret is simple: if you just stop thinking about yourself all the time, happiness and confidence will come naturally. The key to this life-changing outlook lies in the ancient strategies of the warrior kings and queens of Shambhala.\n\nThe kingdom of Shambhala was an enlightened kingdom of benevolent kings and queens and fiercely trained warriors. No one knows for sure whether this kingdom was real or mythical, but there are ancient guidebooks to this land and practical instructions for creating a Shambhala in your own world, bringing peace, purpose, and perspective into your life and environment. In Ruling Your World, Sakyong Mipham, East-meets-West Renaissance lama and leader of the worldwide Shambhala organization, shares the lessons of the great warriors that show us how to rule our minds and our lives with confidence. You don\'t have to go through life simply reacting — with the help of Sakyong Mipham, we can all learn to rule our world.\n\n"We live in a world where suffering is the constant. If we find pain in our life, we shouldn\'t be shocked, or take it as a personal insult. We haven\'t failed as human beings if we suffer. In fact, suffering lays the ground for compassion — consideration for others and ourselves. Everybody has bad days, everybody has difficulties, and blaming somebody else is not going to change that truth. Blaming is a way of running from that truth. When we take the path of blame, each complaint lays the ground for the next, and nothing gets any better. Thus the cycle continues. That is the meaning of the word samsara — circular, always feeling the rub of suffering and then looking for a way to make it go away."\n\n"The remedy for samsara is a reality check. There is always something to complain about; blaming others for that is not going to bring peace or happiness. If we can relax our mind instead of blaming, we might see the humor in how the world works. We will remember that underneath it all, we are already happy. Recognizing, acknowledging, and releasing thoughts by bringing our mind back to the object of meditation helps remind us that the frantic agitation of blame is unnatural and temporary. The wisdom and love beneath the clutter of negativity are natural and permanent."\n\n"In discovering this space, we are spawning a new relationship to our life. We are switching tracks. The maturity we develop by following the path of virtue gives us the base by which we can feel compassion for others instead of blaming them. Instead of obsessing on our own satisfaction, we begin to see what is going on with others. We can see that the person we are blaming needs help, and so we help him. Helping him reduces our desire to blame, and increases our desire to be of benefit." — from Ruling Your World',
  },
  {
    title: 'Turning the Mind Into an Ally',
    author: 'Sakyong Mipham Rinpoche',
    cover: '/images/books/TurningTheMindIntoAnAlly.jpg',
    shortText:
      'Is the mind our enemy? It can be, suggests Shambhala International\'s director Mipham in his first book. The key to peaceful and sane living, says Mipham, is training our minds. Without that training, people live "at the mercy of our moods." Meditation is the tool that can help spiritual seekers master, rather than be mastered by, their own minds. This book blends a philosophically savvy explanation of why meditation is necessary with an artful and accessible introduction to the basics of meditation.',
    extendedText:
      'Mipham moves elegantly from the prosaic (how to sit with a straight spine) to the profound (why one should bravely contemplate illness, aging and death). Indeed, those practicing spiritual disciplines from any tradition — Christian, Wiccan, and so forth — could benefit from Mipham\'s commonsense approach to meditation. He acknowledges, for example, that the tyro might get bored, distracted or even hungry for a cookie. New meditators are likely to find a million and one excuses for not meditating. But, says Mipham gently, "at some point you just have to sit down and do it."\n\nMipham\'s guide is distinguished by its intelligible prose; unlike many fellow travelers, he does not drown his reader in jargon. He defines Buddhist basics, like "samsara" and "karma," clearly. Three useful appendices, outlining meditation postures and giving simple instructions for contemplation, round out the book, and a foreword by Pema Chodron is an added treat. This easy read is one of the best of the Buddhism-for-Westerners genre.',
  },
  {
    title: 'Shambhala, The Sacred Path of the Warrior',
    author: 'Chögyam Trungpa. Edited by Carolyn Gimian. Foreword by Osel Tendzin.',
    cover: '/images/books/shambhala.jpg',
    shortText: '',
    extendedText: null,
  },
  {
    title: 'Meditation in Action',
    author: 'Chögyam Trungpa',
    cover: '/images/books/meditationinaction.jpg',
    shortText:
      'This classic teaching by a Tibetan master continues to inspire both beginners and long-time practitioners of Buddhist meditation. Chögyam Trungpa Rinpoche shows that meditation extends beyond the formal practice of sitting to build the foundation for compassion, awareness, and creativity in all aspects of life. He explores the six activities associated with meditation in action — generosity, discipline, patience, energy, clarity, and wisdom — revealing that through simple, direct experience, one can attain real wisdom: the ability to see clearly into situations and deal with them skillfully, without the self-consciousness connected with ego.',
    extendedText: null,
  },
  {
    title: 'Born in Tibet',
    author: 'Chögyam Trungpa. Foreword by Marco Pallis.',
    cover: '/images/books/bornintibet.jpg',
    shortText:
      'Chögyam Trungpa — meditation master, scholar, and artist — was identified at the age of only thirteen months as a major tulku, or reincarnation of an enlightened teacher. As the eleventh in the teaching lineage known as the Trungpa tulkus, he underwent a period of intensive training in meditation, philosophy, and fine arts, receiving full ordination as a monk in 1958 at the age of eighteen. The following year, the Chinese Communists invaded Tibet, and the young Trungpa spent many harrowing months trekking over the Himalayas, narrowly escaping capture.',
    extendedText:
      "Trungpa's account of his experiences as a young monk, his duties as the abbot and spiritual head of a great monastery, and his moving relationships with his teachers offers a rare and intimate glimpse into the life of a Tibetan lama. The memoir concludes with his daring escape from Tibet to India. In an epilogue, he describes his emigration to the West, where he encountered many people eager to learn about the ancient wisdom of Tibetan Buddhism.",
  },
  {
    title: 'Cutting Through Spiritual Materialism',
    author: 'Chögyam Trungpa',
    cover: '/images/books/cutting.jpg',
    shortText:
      'The now classic Cutting Through Spiritual Materialism is the record of two series of lectures given by Trungpa Rinpoche in 1970-71. First discussed are the various ways in which people involve themselves in spiritual materialism, the many forms of self-deception into which aspirants may fall. After this tour of the sidetracks along the way, the broad outlines of the true spiritual path are discussed. The approach presented is a classical Buddhist one — not in a formal sense, but in the sense of presenting the heart of the Buddhist approach to spirituality.',
    extendedText:
      'Although the Buddhist way is not theistic, it does not contradict the theistic disciplines. Rather the differences between the ways are a matter of emphasis and method. The basic problems of spiritual materialism are common to all spiritual disciplines.',
  },
  {
    title: 'Great Eastern Sun: The Wisdom of Shambhala',
    author: 'Chögyam Trungpa. Edited by Carolyn Gimian.',
    cover: '/images/books/greateasternsun.jpg',
    shortText:
      "The journey that began in Shambhala: The Sacred Path of the Warrior reaches a new level of intimacy and depth in this book, based on talks Chögyam Trungpa gave in the last ten years of his life. Trungpa possessed uncanny insight into our deepest fears, and how these are heightened by the pressures of today's society. He addresses many of them here: the speed and alienation of modern life; depression; materialism; aggression, anger, and anxiety; and a crippling lack of self-worth. Trungpa also held an unshakable belief in human goodness and our ability to create an enlightened human society.",
    extendedText:
      'His most ardent message is that each of us is a genuine and powerful individual who can help this world. Throughout the book, he evokes the image of a spark or dot of goodness that is always available to us — the fuse for igniting warriorship in our lives. In every line of this extraordinary and uplifting collection, he challenges us to embrace life and to find the Great Eastern Sun, the spark of sacredness and health in every moment.',
  },
  {
    title: 'The Heart of the Buddha',
    author: 'Chögyam Trungpa',
    cover: '/images/books/theheartofthebuddha.jpg',
    shortText:
      'This compelling collection of essays, talks, and seminars presents the basic teachings of Buddhism as they relate to everyday life. The book is divided into three parts. In "Personal Journey," the author discusses the qualities of openness, inquisitiveness, and good humor that characterize the enlightened Buddha-nature in everyone. In "Stages on the Path," he presents the three vehicles — Hinayana, Mahayana, and Vajrayana — that carry the Buddhist practitioner toward Enlightenment. In "Working with Others," he describes the direct application of Buddhist teachings.',
    extendedText:
      "Chögyam Trungpa's great appreciation of Western culture combined with his deep understanding of the Tibetan tradition makes these teachings uniquely accessible to Western readers.",
  },
  {
    title: 'The Myth of Freedom and the Way of Meditation',
    author: 'Chögyam Trungpa',
    cover: '/images/books/themythoffreedom.jpg',
    shortText:
      'Freedom is generally thought of as the ability to achieve goals and satisfy desires. But what are the sources of these goals and desires? If they arise from ignorance, habitual patterns, and negative emotions — psychologically destructive elements that actually enslave us — is the freedom to pursue them true freedom or just a myth? In this book, Chögyam Trungpa explores the meaning of freedom in the profound context of Tibetan Buddhism. He shows how our attitudes, preconceptions, and even our spiritual practices can become chains that bind us to repetitive patterns of frustration and despair.',
    extendedText:
      "He also explains the role of meditation in bringing into focus the causes of frustration and in allowing these negative forces to become aids in advancing toward true freedom. Trungpa's unique ability to express the essence of Buddhist teachings in the language and imagery of contemporary American culture makes this book one of the most immediately available sources for the meaning of the Buddhist doctrine ever written.",
  },
  {
    title: 'Training the Mind and Cultivating Loving-Kindness',
    author: 'Chögyam Trungpa',
    cover: '/images/books/trainingthemind.jpg',
    shortText:
      'WARNING: Using this book could be hazardous to your ego! The slogans it contains are designed to awaken the heart and cultivate love and kindness toward others. They are revolutionary in that practicing them fosters abandonment of personal territory in relating to others and in understanding the world as it is. The fifty-nine provocative slogans presented here — each with a commentary by the Tibetan meditation master Chögyam Trungpa — have been used by Tibetan Buddhists for eight centuries, to help meditation students remember and focus on important principles and practices of mind training.',
    extendedText:
      'They emphasize meeting the ordinary situations of life with intelligence and compassion under all circumstances.',
  },
  {
    title: 'The Art of Calligraphy',
    author: 'Chögyam Trungpa',
    cover: '/images/books/theartofcalligraphy.jpg',
    shortText:
      'During the twenty-year period of his remarkable proclamation of Buddhist and Shambhala teachings in the West, calligraphy was a primary means of expression for Chögyam Trungpa. This book showcases fifty-eight of his brushworks — poems, seed syllables, and phrases as well as abstract images. Facing them are short, pertinent quotations from his prose and poetry.',
    extendedText:
      'An essay entitled "Heaven, Earth, and Man," based on one of Trungpa\'s "dharma art" workshops, is also included. Here he emphasizes what he called "art in everyday life": the cool, peaceful expression of unconditional beauty that offers us the possibility of being able to relax enough to perceive the phenomenal world and our own senses properly. He goes on to show how the dynamic of heaven, earth, and man (the ancient Oriental hierarchy of the cosmos) is basic to any artistic endeavor — painting, building a city, or designing an airplane — as well as to perceiving the art that surrounds us. He also introduces the idea that "the discipline of art-making" can be used to organize and create a decent society.',
  },
  {
    title: 'Crazy Wisdom',
    author: 'Chögyam Trungpa',
    cover: '/images/books/crazywisdom.jpg',
    shortText:
      'Chögyam Trungpa describes "crazy wisdom" as an innocent state of mind that has the quality of early morning — fresh, sparkling, and completely awake. This fascinating book examines the life of Padmasambhava — the revered Indian teacher who brought Buddhism to Tibet — to illustrate the principle of crazy wisdom. From this profound point of view, spiritual practice does not provide comfortable answers to pain or confusion. On the contrary, painful emotions can be appreciated as a challenging opportunity for new discovery. In particular, the author discusses meditation as a practical way to uncover one\'s own innate wisdom.',
    extendedText: null,
  },
  {
    title: 'The Dawn of Tantra',
    author: 'Herbert V. Guenther, Chögyam Trungpa',
    cover: '/images/books/thedawnoftantra.jpg',
    shortText:
      'Westerners wanting to know about tantra — particularly the Buddhist tantra of Tibet — often find only speculation and fancy. Tibet has been shrouded in mystery, and "tantra" has been called upon to name every kind of esoteric fantasy. In The Dawn of Tantra the reader meets a Tibetan meditation master and a Western scholar, each of whose grasp of Buddhist tantra is real and unquestionable. This collaboration is both true to the intent of the ancient Tibetan teachings and relevant to contemporary Western life.',
    extendedText: null,
  },
  {
    title: 'Dharma Art',
    author: 'Chögyam Trungpa. Edited by Judith Lief.',
    cover: '/images/books/dharmaart.jpg',
    shortText:
      '"Dharma art" refers to creative works that spring from the awakened meditative state, characterized by directness, unselfconsciousness, and nonaggression. Trungpa Rinpoche shows that dharma art provides a vehicle to appreciate the nature of things as they are and express it without any struggle or desire to achieve.',
    extendedText: null,
  },
  {
    title: 'Glimpses of Abhidharma: From a Seminar on Buddhist Psychology',
    author: 'Chögyam Trungpa',
    cover: '/images/books/glimpses.jpg',
    shortText:
      'The Abhidharma is a collection of Buddhist scriptures that investigate the workings of the mind and the states of human consciousness. In this book, Chögyam Trungpa shows how an examination of the formation of the ego provides us with an opportunity to develop real intelligence. Trungpa also presents the practice of meditation as the means that enables us to see our psychological situation clearly and directly.',
    extendedText: null,
  },
  {
    title: "Illusion's Game: The Life and Teaching of Naropa",
    author: 'Chögyam Trungpa',
    cover: '/images/books/illusionsgame.jpg',
    shortText:
      'In what he calls a "200 percent potent" teaching, Chögyam Trungpa reveals how the spiritual path is a raw and rugged "unlearning" process that draws us away from the comfort of conventional expectations and conceptual attitudes toward a naked encounter with reality. The tantric paradigm for this process is the story of the Indian master Naropa (1016-1100), who is among the enlightened teachers of the Kagyu lineage of Tibetan Buddhism.',
    extendedText:
      "Naropa was the leading scholar at Nalanda, the Buddhist monastic university, when he embarked upon the lonely and arduous path to Enlightenment. After a series of daunting trials, he was prepared to receive the direct transmission of the awakened state of mind from his guru, Tilopa. Teachings that he received, including those known as the six doctrines of Naropa, have been passed down in the lineages of Tibetan Buddhism for a millennium.\n\nTrungpa's commentary shows the relevance of Naropa's extraordinary journey for today's practitioners who seek to follow the spiritual path. Naropa's story makes it possible to delineate in very concrete terms the various levels of spiritual development that lead to the student's readiness to meet the teacher's mind. Trungpa thus opens to Western students of Buddhism the path of devotion and surrender to the guru as the embodiment and representative of reality.",
  },
  {
    title: 'The Life of Marpa the Translator',
    author: 'Translated by Nalanda Translation Committee, Chögyam Trungpa',
    cover: '/images/books/thelifeofmarpa.jpg',
    shortText:
      'Marpa the Translator, the eleventh-century farmer, scholar, and teacher, is one of the most renowned saints in Tibetan Buddhist history. This lucid and moving translation documents the fascinating life of Marpa, who, unlike many other Tibetan masters, was a layman, a skillful businessman who raised a family while training his disciples.',
    extendedText:
      "As a youth, Marpa was inspired to travel to India to study the Buddhist teachings, for at that time in Tibet, Buddhism had waned considerably through ruthless suppression by an evil king. The author paints a vivid picture of Marpa's three journeys to India: precarious mountain passes, desolate plains teeming with bandits, greedy customs-tax collectors. Marpa endured many hardships, but nothing to compare with the trials that ensued with his guru Naropa and other teachers. Yet Marpa succeeded in mastering the tantric teachings, translating and bringing them to Tibet, and establishing the Practice Lineage of the Kagyüs, which continues to this day.",
  },
  {
    title: "The Lion's Roar",
    author: 'Chögyam Trungpa',
    cover: '/images/books/thelionsroar.jpg',
    shortText:
      'This book is based on two historic seminars of the 1970s, in which Chögyam Trungpa introduced the tantric teachings of Tibetan Buddhism to his Western students for the first time. Nine vehicles, arranged in successive levels, make up the whole path of Buddhist practice. Teaching all nine means giving a total picture of the spiritual journey.',
    extendedText:
      "The author's nontheoretical, experiential approach opens up a world of fundamental psychological insights and subtleties. He speaks directly to a contemporary Western audience, using earthly analogies that place the ancient teachings in the midst of ordinary life.",
  },
  {
    title: 'Mudra: Early Poems and Songs',
    author: 'Chögyam Trungpa',
    cover: '/images/books/mudra.jpg',
    shortText:
      'A mudra is a symbolic gesture or action that gives physical expression to an inner state. This book of poetry and songs of devotion, written by Chögyam Trungpa between 1959 and 1971, is spontaneous and celebratory. This volume also includes the ten traditional Zen oxherding pictures accompanied by a unique commentary that offers an unmistakably Tibetan flavor. Fans of this renowned teacher will enjoy the heartfelt devotional quality of this early work.',
    extendedText: null,
  },
  {
    title: 'The Tibetan Book of the Dead: The Great Liberation through Hearing in the Bardo',
    author: 'Translated by Francesca Fremantle, Chögyam Trungpa',
    cover: '/images/books/tibetanbookofthedead.jpg',
    shortText:
      "In this classic of the world's religious literature — traditionally read aloud to the dying — death and rebirth are seen as a process that offers the possibility of attaining ultimate liberation. This unabridged translation emphasizes the practical advice that the book offers to the living. The insightful commentary by the renowned meditation master Chögyam Trungpa explains what the scripture teaches about human psychology.",
    extendedText: null,
  },
  {
    title: 'Timely Rain: Selected Poetry of Chögyam Trungpa',
    author: 'Chögyam Trungpa. Edited by David Rome.',
    cover: '/images/books/timelyrain.jpg',
    shortText: '',
    extendedText: null,
  },
  {
    title: 'Sacred World: The Shambhala Way to Gentleness, Bravery, and Power',
    author: 'Jeremy Hayward, Karen Hayward',
    cover: '/images/books/sacredworld.jpg',
    shortText:
      'The Haywards take the reader on a journey through ordinary experience into the sacred world, uncovering obstacles to living in sacredness and exploring ways to work with these obstacles. Their meditations, personal insights, anecdotes, and mindfulness exercises guide the reader toward self-knowledge and empathy.',
    extendedText:
      'The Haywards lead retreats on the Shambhala teachings of Chögyam Trungpa, one of the pioneers of Buddhism in the West. One of the book\'s purposes is to show the reader how to recover perception of the heart.\n\n"Being a warrior has nothing to do with waging war. Being a warrior means you have the courage to know who you are. Warriors never give up on anyone, including themselves." — from Sacred World\n\nAbout the Authors: Jeremy and Karen Hayward were close friends and students of Chögyam Trungpa, one of the first Tibetan Buddhist teachers in America and founder of the Naropa Institute. Jeremy Hayward helped Trungpa present the teachings of Shambhala warriorship through Shambhala Training, of which he is now international education director. Karen Hayward was the first director of the Kalapa Ikebana school of flower arranging that was founded by Chögyam Trungpa. The Haywards teach warriorship retreats around the world.',
  },
  {
    title: 'Awakening Loving-Kindness',
    author: 'Pema Chödrön',
    cover: '/images/books/awakening.jpg',
    shortText:
      'This book is about saying yes to life, about making friends with ourselves and our world, about accepting the delightful and painful situation of "no-exit." It exhorts us to wake up wholeheartedly to everything and to use the abundant richly textured fabric of everyday life as our primary spiritual teacher and guide.',
    extendedText: null,
  },
  {
    title: 'The Places That Scare You: A Guide to Fearlessness in Difficult Times',
    author: 'Pema Chödrön',
    cover: '/images/books/theplaces.jpg',
    shortText:
      'In The Places That Scare You, Pema Chödrön continues the teachings of When Things Fall Apart, showing how at the core of the most painful experiences lie the seeds of spiritual awakening. Here she presents key teachings on recognizing and cultivating the "soft spot" that is the gateway to compassion and open-heartedness.',
    extendedText:
      'In this book she discusses: The four great catalysts of awakening, and how to integrate them into our lives. Why the "soft spot" is necessary for spiritual awakening. The basic goodness that is inherently ours. How the three noble principles can enrich everything we do. The maitri meditation that multiplies love. Why an attitude of "don\'t know" can be wiser than the world\'s greatest spiritual teachings. How to keep the heart open with equal fearlessness to both heartache and delight.',
  },
  {
    title: 'Start Where You Are',
    author: 'Pema Chödrön',
    cover: '/images/books/startwhereyouare.jpg',
    shortText:
      'With insight and humor, Pema Chödrön presents down-to-earth guidance on how we can "start where we are" — embracing rather than denying the painful aspects of our lives. Pema Chödrön frames her teachings on compassion around fifty-nine traditional Tibetan Buddhist maxims, or slogans, such as: "Always apply only a joyful state of mind," "Don\'t seek others\' pain as the limbs of your own happiness," and "Always meditate on whatever provokes resentment."',
    extendedText: null,
  },
  {
    title: 'When Things Fall Apart: Heart Advice for Difficult Times',
    author: 'Pema Chödrön',
    cover: '/images/books/whenthingsfallapart.jpg',
    shortText:
      'The beautiful practicality of her teaching has made Pema Chödrön one of the most beloved of contemporary American spiritual authors among Buddhists and non-Buddhists alike. A collection of talks she gave between 1987 and 1994, the book is a treasury of wisdom for going on living when we are overcome by pain and difficulties.',
    extendedText:
      'Chödrön discusses: using painful emotions to cultivate wisdom, compassion, and courage; communicating so as to encourage others to open up rather than shut down; practices for reversing habitual patterns; methods for working with chaotic situations; ways for creating effective social action.',
  },
  {
    title: 'The Wisdom of No Escape',
    author: 'Pema Chödrön',
    cover: '/images/books/thewisdomofnoescape.jpg',
    shortText:
      'This book is about saying yes to life in all its manifestations — embracing the potent mixture of joy, suffering, brilliance, and confusion that characterizes the human experience. Pema Chödrön shows us the profound value of our situation of "no escape" from the ups and downs of life.',
    extendedText: null,
  },
  {
    title: "Dakini's Warm Breath: The Feminine Principle in Tibetan Buddhism",
    author: 'Judith Simmer-Brown',
    cover: '/images/books/dakiniswarmbreath.jpg',
    shortText:
      'The primary emblem of the feminine in Tibetan Buddhism is the dakini, or "sky-dancer," a semi-wrathful spirit-woman who manifests in visions, dreams, and meditation experiences.',
    extendedText:
      'Western scholars and interpreters of the dakini, influenced by Jungian psychology and feminist goddess theology, have shaped a contemporary critique of Tibetan Buddhism in which the dakini is seen as a psychological "shadow," a feminine savior, or an objectified product of patriarchal fantasy. According to Judith Simmer-Brown — who writes from the point of view of an experienced practitioner of Tibetan Buddhism — such interpretations are inadequate.\n\nIn the spiritual journey of the meditator, Simmer-Brown demonstrates, the dakini symbolizes levels of personal realization: the sacredness of the body, both female and male; the profound meeting point of body and mind in meditation; the visionary realm of ritual practice; and the empty, spacious qualities of mind itself. When the meditator encounters the dakini, living spiritual experience is activated in a nonconceptual manner by her direct gaze, her radiant body, and her compassionate revelation of reality.',
  },
  {
    title: 'Making Friends with Death: A Buddhist Guide to Encountering Mortality',
    author: 'Judith Lief',
    cover: '/images/books/makingfriend.jpg',
    shortText:
      'In Making Friends with Death, Buddhist teacher Judith Lief shows us that through the powerful combination of contemplation of death and mindfulness practice, we can change how we relate to death, enhance our appreciation of everyday life, and use our developing acceptance of our own vulnerability as a basis for opening to others. She also offers a series of guidelines to help us reconnect with dying persons, whether they are friends or family, clients or patients.',
    extendedText:
      'Lief highlights the value of relating to the immediacy of death as an ongoing aspect of everyday life by offering readers a variety of practical methods that they can apply to their lives and work. These methods include:\n\n1. Simple mindfulness exercises for deepening awareness of moment-by-moment change\n2. Practices for cultivating loving-kindness\n3. Helpful slogans and guidelines for caregivers to use\n\nMaking Friends with Death will enlighten anyone interested in coming to terms with their own mortality. More specifically, the contemplative approach presented here offers health professionals, students of death and dying, and people who are helping a dying friend or relative useful guidance and inspiration. It will show them how to ground their actions in awareness and compassion, so that the steps they take in dealing with pain and suffering will be more effective.',
  },
];
