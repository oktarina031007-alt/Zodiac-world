import { ZodiacSign, Accessory, Achievement } from '../types/game';

export const BLOO_CORRECT_SPEECH = "Yeayyy! Kamu hebat banget! Jawaban kamu benar! Ayo kumpulkan lebih banyak bintang! ⭐";
export const BLOO_WRONG_SPEECH = "Upsieee! Belum tepat nih! Nggak apa-apa, coba lagi ya! Bloo yakin kamu pasti bisa! 💙";

export const BLOO_TOUCH_DIALOGUES = [
  "Hehehe! Gelitik aku, ya? ✨",
  "Haiii! Aku Bloo, sahabat bintangmu! 💙",
  "Ayo kita bermain di langit kosmik!",
  "Yeay! Kamu datang! Bloo senang sekali!",
  "Sentuh aku lagi, yuk! Hihihi! ⭐",
  "Wah, bintangnya banyak sekali di langit!",
  "Ayo kumpulkan bintang bersama Bloo!",
  "Hihihi, kamu lucu dan baik banget!"
];

export const BLOO_GREETING_LINES = [
  "Haiii, teman kecil! 💙 Selamat datang di Zodiac World! Yuk, kita bermain dan menjelajahi dunia zodiak bersama! ✨",
  "Yeayyy, akhirnya kamu datang juga! Aku Bloo, teman petualanganmu! Di sini kita bisa bermain, menebak zodiak, dan mengumpulkan bintang!",
  "Kamu sudah siap belum? Ayo tekan Play Adventure, yuk! Yeeeyyy! Bloo sudah nggak sabar! ⭐"
];

export const ZODIAC_LIST: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    dates: '21 Mar - 19 Apr',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    element: 'Api',
    title: 'Domba Pemberani',
    tagline: 'Sang Pelopor Berani & Penuh Semangat',
    description: 'Aries adalah domba kecil yang memiliki tanduk emas melingkar dan hati yang sangat berani! Selalu siap memimpin petualangan seru tanpa rasa takut.',
    traits: ['Pemberani', 'Penuh Energi', 'Jujur', 'Ceria'],
    luckyColor: 'Emas Cerah & Biru Samudra',
    luckyStone: 'Intan Kosmik',
    luckyNumber: 9,
    quote: '"Maju terus pantang menyerah, bintang impian menunggu kita!"',
    cost: 0, // Unlocked by default
    island: {
      name: 'Puncak Api Aries',
      description: 'Gunung megah berpadu awan emas tempat domba-domba kecil bermain loncat batu kristal.',
      theme: 'Puncak Gunung Berapi Emas',
      challengeTitle: 'Tantangan Domba Berani',
      challengeQuestion: 'Apakah simbol rasi bintang Aries dalam astrologi kosmik?',
      options: ['Domba Jantan (Ram)', 'Singa Perkasa', 'Banteng Emas', 'Kepiting Laut'],
      correctIndex: 0,
      rewardStars: 25
    }
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    dates: '20 Apr - 20 Mei',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    element: 'Tanah',
    title: 'Banteng Menggemaskan',
    tagline: 'Sahabat Setia Pencinta Keindahan',
    description: 'Banteng mungil berlonceng emas yang suka makan camilan manis dan merawat bunga mekar di padang rumput biru.',
    traits: ['Setia', 'Penyabar', 'Pecinta Damai', 'Penyayang'],
    luckyColor: 'Sky Blue & Kuning Pastel',
    luckyStone: 'Zamrud Langit',
    luckyNumber: 6,
    quote: '"Kebaikan dan kesabaran selalu menghasilkan bunga yang paling indah!"',
    cost: 0, // Unlocked by default
    island: {
      name: 'Taman Bunga Taurus',
      description: 'Lembah wangi berhiaskan bunga clover raksasa dan lonceng kristal yang berdentang merdu.',
      theme: 'Taman Bunga Kristal',
      challengeTitle: 'Teka-Teki Alam Taurus',
      challengeQuestion: 'Taurus termasuk dalam kelompok elemen kosmik apa?',
      options: ['Api', 'Tanah (Bumi)', 'Air Samudra', 'Udara Angin'],
      correctIndex: 1,
      rewardStars: 25
    }
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    dates: '21 Mei - 20 Jun',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    element: 'Udara',
    title: 'Kembar Ceria',
    tagline: 'Dua Bintang Kembar Penjelajah Ide',
    description: 'Dua anak bintang kembar yang tak pernah berhenti tersenyum, suka bercerita, dan penuh rasa ingin tahu tinggi.',
    traits: ['Cerdas', 'Komunikatif', 'Fleksibel', 'Ceria'],
    luckyColor: 'Kuning Mentari & Baby Blue',
    luckyStone: 'Agate Bintang',
    luckyNumber: 5,
    quote: '"Dunia ini penuh misteri asyik, ayo kita cari tahu bersama!"',
    cost: 60,
    island: {
      name: 'Kepulauan Kembar Gemini',
      description: 'Dua pulau melayang yang terhubung jembatan pelangi biru bercahaya dengan kincir angin kosmik.',
      theme: 'Jembatan Cahaya Angin',
      challengeTitle: 'Tantangan Kembar Cerdas',
      challengeQuestion: 'Planet apakah yang menjadi penguasa zodiak Gemini yang lincah?',
      options: ['Merkurius', 'Mars', 'Jupiter', 'Neptunus'],
      correctIndex: 0,
      rewardStars: 30
    }
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    dates: '21 Jun - 22 Jul',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    element: 'Air',
    title: 'Kepiting Pemalu',
    tagline: 'Pelindung Lembut Berhati Emas',
    description: 'Kepiting kecil berbibir imut yang tinggal di cangkang mutiara bercahaya. Sangat penyayang dan selalu menjaga teman-temannya.',
    traits: ['Penyayang', 'Peka', 'Pelindung', 'Imajinatif'],
    luckyColor: 'Pearl White & Ocean Blue',
    luckyStone: 'Mutiara Bulan Biru',
    luckyNumber: 2,
    quote: '"Keluarga dan sahabat adalah mutiara terindah di alam semesta."',
    cost: 75,
    island: {
      name: 'Pantai Mutiara Cancer',
      description: 'Pesisir pantai biru toska berpasir putih gemerlap dengan air terjun susu kelapa kosmik.',
      theme: 'Laguna Pasir Mutiara',
      challengeTitle: 'Pencarian Mutiara Bulan',
      challengeQuestion: 'Benda langit apakah yang menguasai zodiak Cancer?',
      options: ['Bulan (Moon)', 'Matahari', 'Bintang Kejora', 'Komet Halley'],
      correctIndex: 0,
      rewardStars: 30
    }
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    dates: '23 Jul - 22 Agu',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    element: 'Api',
    title: 'Singa Mahkota Emas',
    tagline: 'Raja Cilik yang Berkarisma & Dermawan',
    description: 'Anak singa dengan surai emas berkilau dan mahkota bintang. Selalu menjadi pusat perhatian dengan senyumnya yang menghangatkan!',
    traits: ['Percaya Diri', 'Dermawan', 'Hangat', 'Berani'],
    luckyColor: 'Gold Yellow & Sky Blue',
    luckyStone: 'Rubi Surya',
    luckyNumber: 1,
    quote: '"Jadilah bintang yang bersinar terang agar semua orang ikut tersenyum!"',
    cost: 90,
    island: {
      name: 'Istana Matahari Leo',
      description: 'Kastel megah di atas awan dengan pilar emas dan kolam air mancur yang memancarkan kilau mentari.',
      theme: 'Kastel Megah Keemasan',
      challengeTitle: 'Ujian Sang Raja Cilik',
      challengeQuestion: 'Simbol hewan apakah yang melambangkan zodiak Leo?',
      options: ['Singa (Lion)', 'Harimau', 'Elang Emas', 'Naga'],
      correctIndex: 0,
      rewardStars: 35
    }
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    dates: '23 Agu - 22 Sep',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    element: 'Tanah',
    title: 'Peri Bintang Teliti',
    tagline: 'Cendekiawan Mungil Penyuka Kerapian',
    description: 'Gadis peri mungil pembawa buku catatan bintang dan bulu pena angkasa. Sangat rapi, teliti, dan suka membantu siapa saja.',
    traits: ['Teliti', 'Pintar', 'Rapi', 'Suka Membantu'],
    luckyColor: 'Biru Lembut & Pearl White',
    luckyStone: 'Safir Langit',
    luckyNumber: 5,
    quote: '"Kerapian kecil melahirkan keajaiban yang luar biasa!"',
    cost: 90,
    island: {
      name: 'Taman Kerapian Virgo',
      description: 'Taman geometris yang tertata sangat anggun dengan labirin kristal bening dan perpustakaan awan.',
      theme: 'Taman Kristal Rapi',
      challengeTitle: 'Teka-Teki Logika Virgo',
      challengeQuestion: 'Virgo dikenal paling menonjol dalam hal kepribadian apa?',
      options: ['Ketelitian dan Kerapian', 'Suka Membuat Onar', 'Suka Tidur Seharian', 'Mudah Marah'],
      correctIndex: 0,
      rewardStars: 35
    }
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    dates: '23 Sep - 22 Okt',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    element: 'Udara',
    title: 'Penjaga Keseimbangan',
    tagline: 'Bidadari Anggun Penggemar Harmoni',
    description: 'Karakter bersayap starlight dengan timbangan emas melayang. Selalu menciptakan kedamaian dan keadilan di mana pun berada.',
    traits: ['Adil', 'Ramah', 'Harmonis', 'Pencinta Seni'],
    luckyColor: 'Baby Blue & Soft Pink',
    luckyStone: 'Opal Kosmik',
    luckyNumber: 7,
    quote: '"Saat hati kita seimbang, seluruh galaksi ikut menari damai!"',
    cost: 100,
    island: {
      name: 'Kuil Keseimbangan Libra',
      description: 'Kuil marmer putih pearl melayang dengan timbangan raksasa yang menyeimbangkan air laut dan bintang.',
      theme: 'Kuil Harmoni Angkasa',
      challengeTitle: 'Timbangan Kebenaran',
      challengeQuestion: 'Apakah satu-satunya zodiak yang dilambangkan oleh benda mati (bukan makhluk hidup)?',
      options: ['Libra (Timbangan)', 'Aries (Domba)', 'Pisces (Ikan)', 'Taurus (Banteng)'],
      correctIndex: 0,
      rewardStars: 40
    }
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    dates: '23 Okt - 21 Nov',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    element: 'Air',
    title: 'Kalajengking Kristal',
    tagline: 'Penjaga Misteri Bertekad Baja',
    description: 'Kalajengking kecil dengan ujung ekor bintang yang menyala biru safir. Tampak misterius namun sangat protektif dan setia kawan.',
    traits: ['Misterius', 'Fokus Tinggi', 'Pemberani', 'Setia Kawan'],
    luckyColor: 'Ocean Blue Gelap & Gold',
    luckyStone: 'Topaz Biru Dalam',
    luckyNumber: 8,
    quote: '"Di kedalaman rahasia kosmik, terdapat kekuatan terhebat kita!"',
    cost: 110,
    island: {
      name: 'Gua Kristal Scorpio',
      description: 'Gua melayang berhiaskan geode kristal biru safir yang berpendar menembus kabut bintang perak.',
      theme: 'Gua Geode Kristal Biru',
      challengeTitle: 'Rahasia Gua Kristal',
      challengeQuestion: 'Planet penguasa klasik zodiak Scorpio dalam tradisi astrologi adalah?',
      options: ['Mars & Pluto', 'Venus & Jupiter', 'Bulan & Merkurius', 'Matahari & Saturnus'],
      correctIndex: 0,
      rewardStars: 40
    }
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    dates: '22 Nov - 21 Des',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    element: 'Api',
    title: 'Pemanah Petualang',
    tagline: 'Penjelajah Antariksa yang Optimis Bebas',
    description: 'Pemanah kecil berbusur cahaya bintang yang hobi meluncur melewati komet dan menelusuri rasi bintang baru.',
    traits: ['Optimis', 'Suka Petualangan', 'Bebas', 'Filosofis'],
    luckyColor: 'Cyan Biru Cerah & Emas',
    luckyStone: 'Turquoise Angkasa',
    luckyNumber: 3,
    quote: '"Bidiklah bintang tertinggi, dan nikmati serunya setiap lompatan!"',
    cost: 120,
    island: {
      name: 'Hutan Bintang Sagittarius',
      description: 'Hutan pohon kristal tinggi dengan panah-panah cahaya yang melesat melintasi cakrawala langit biru.',
      theme: 'Hutan Pohon Cahaya',
      challengeTitle: 'Bidik Bintang Sagittarius',
      challengeQuestion: 'Sagittarius sering digambarkan sebagai sosok makhluk mitologi apa?',
      options: ['Centaur (Manusia Kuda Pemanah)', 'Pegasus Terbang', 'Griffin Penjaga', 'Sphinx Gurun'],
      correctIndex: 0,
      rewardStars: 45
    }
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    dates: '22 Des - 19 Jan',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    element: 'Tanah',
    title: 'Kambing Laut Rajin',
    tagline: 'Pekerja Keras Penakluk Puncak Tertinggi',
    description: 'Kambing laut mungil bertanduk kristal es. Sangat tekun, disiplin, dan tak pernah lelah mendaki gunung tertinggi demi meraih cita-cita.',
    traits: ['Disiplin', 'Pekerja Keras', 'Bijaksana', 'Tanggung Jawab'],
    luckyColor: 'Deep Ocean Blue & Perak Mutiara',
    luckyStone: 'Onyx Laut Kosmik',
    luckyNumber: 4,
    quote: '"Langkah demi langkah kecil yang konsisten akan membawamu ke puncak semesta!"',
    cost: 130,
    island: {
      name: 'Puncak Salju Capricorn',
      description: 'Pegunungan es kristal bercahaya lembut dengan kastel observatorium bintang di puncaknya.',
      theme: 'Puncak Es Observatorium',
      challengeTitle: 'Mendaki Puncak Ambisi',
      challengeQuestion: 'Apakah elemen dari zodiak Capricorn?',
      options: ['Tanah (Earth)', 'Api (Fire)', 'Air (Water)', 'Udara (Air)'],
      correctIndex: 0,
      rewardStars: 45
    }
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    dates: '20 Jan - 18 Feb',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    element: 'Udara',
    title: 'Pembawa Air Kreatif',
    tagline: 'Inovator Unik Pengalir Inspirasi',
    description: 'Karakter imut pembawa guci kosmik yang menuangkan air bintang bercahaya ke seluruh galaksi. Penuh ide brilian dan orisinal!',
    traits: ['Inovatif', 'Mandiri', 'Unik', 'Penyayang Kemanusiaan'],
    luckyColor: 'Electric Sky Blue & Pure White',
    luckyStone: 'Ametis Biru Langit',
    luckyNumber: 11,
    quote: '"Beranilah menjadi berbeda, karena keunikanmu adalah cahaya terindah!"',
    cost: 140,
    island: {
      name: 'Kota Air Aquarius',
      description: 'Kota masa depan yang melayang dengan pipa-pipa air bercahaya dan air terjun tanpa henti ke samudra awan.',
      theme: 'Kota Melayang Saluran Air',
      challengeTitle: 'Aliran Ide Aquarius',
      challengeQuestion: 'Meskipun bernama "Aquarius" dan pembawa air, elemen sesungguhnya dari zodiak ini adalah?',
      options: ['Udara (Air Element)', 'Air Murni', 'Api Menyala', 'Logam Bumi'],
      correctIndex: 0,
      rewardStars: 50
    }
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    dates: '19 Feb - 20 Mar',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    element: 'Air',
    title: 'Ikan Ajaib Samudra',
    tagline: 'Pemimpi Manis dengan Hati Paling Lembut',
    description: 'Sepasang ikan ajaib bersisik biru berkilau yang berenang bebas di antara samudra bintang. Memiliki intuisi luar biasa dan imajinasi tanpa batas!',
    traits: ['Intuitif', 'Penuh Empati', 'Artistik', 'Mimpi Indah'],
    luckyColor: 'Aquamarine Sky Blue & Pearl White',
    luckyStone: 'Aquamarine Laut',
    luckyNumber: 7,
    quote: '"Bermimpilah setinggi bintang, karena mimpi adalah benih kenyataan masa depan!"',
    cost: 150,
    island: {
      name: 'Samudra Bintang Pisces',
      description: 'Dunia bawah laut melayang di angkasa dengan karang kristal biru, ubur-ubur bercahaya, dan gelembung musik.',
      theme: 'Istana Karang Bawah Laut Langit',
      challengeTitle: 'Arus Impian Pisces',
      challengeQuestion: 'Simbol Pisces menggambarkan apa?',
      options: ['Dua ekor ikan berenang berlawanan arah', 'Satu ikan paus besar', 'Kepiting mutiara', 'Putri duyung'],
      correctIndex: 0,
      rewardStars: 50
    }
  }
];

export const ACCESSORIES: Accessory[] = [
  {
    id: 'gold_crown',
    name: 'Mahkota Bintang Emas',
    cost: 60,
    description: 'Mahkota berkilau megah seperti milik Leo si Raja Cilik!',
    category: 'hat',
    icon: '👑'
  },
  {
    id: 'star_wand',
    name: 'Tongkat Bintang Ajaib',
    cost: 80,
    description: 'Tongkat sihir penabur debu bintang berkilauan.',
    category: 'wand',
    icon: '🪄'
  },
  {
    id: 'cosmic_cape',
    name: 'Jubah Awan Biru',
    cost: 70,
    description: 'Jubah lembut sehalus kapas dari Pulau Aquarius.',
    category: 'cape',
    icon: '🦸'
  },
  {
    id: 'angel_halo',
    name: 'Cincin Planet Mini',
    cost: 90,
    description: 'Cincin planet Saturnus mini yang melayang di atas kepala!',
    category: 'charm',
    icon: '🪐'
  },
  {
    id: 'flower_wreath',
    name: 'Mahkota Bunga Taurus',
    cost: 50,
    description: 'Rangkaian bunga clover kosmik harum semerbak.',
    category: 'hat',
    icon: '🌸'
  },
  {
    id: 'pearl_shell',
    name: 'Cangkang Mutiara Cancer',
    cost: 75,
    description: 'Aksesori mutiara laut yang memancarkan cahaya lembut.',
    category: 'charm',
    icon: '🦪'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_login',
    title: 'Penjelajah Pertama',
    description: 'Masuk ke Zodiac World dan kenalan dengan Bloo!',
    rewardStars: 20,
    icon: '🌟',
    current: 1,
    target: 1,
    unlocked: true,
    claimed: false
  },
  {
    id: 'bloo_pet',
    title: 'Sahabat Sejati Bloo',
    description: 'Sentuh dan ajak Bloo bermain sebanyak 10 kali.',
    rewardStars: 30,
    icon: '💙',
    current: 0,
    target: 10,
    unlocked: false,
    claimed: false
  },
  {
    id: 'first_quiz',
    title: 'Bintang Pintar',
    description: 'Selesaikan 1 sesi permainan Guess The Zodiac.',
    rewardStars: 25,
    icon: '🧠',
    current: 0,
    target: 1,
    unlocked: false,
    claimed: false
  },
  {
    id: 'memory_master',
    title: 'Memori Kosmik',
    description: 'Selesaikan permainan Memory Stars dengan sempurna.',
    rewardStars: 35,
    icon: '🃏',
    current: 0,
    target: 1,
    unlocked: false,
    claimed: false
  },
  {
    id: 'speed_quizzer',
    title: 'Kilat Galaksi',
    description: 'Raih skor minimal 80 poin di Cosmic Quiz cepat.',
    rewardStars: 40,
    icon: '⚡',
    current: 0,
    target: 80,
    unlocked: false,
    claimed: false
  },
  {
    id: 'who_am_i_champ',
    title: 'Detektif Astrologi',
    description: 'Tebak zodiak rahasia dengan tepat di game Who Am I?',
    rewardStars: 30,
    icon: '🔍',
    current: 0,
    target: 1,
    unlocked: false,
    claimed: false
  },
  {
    id: 'unlock_characters',
    title: 'Kolektor Rasi Bintang',
    description: 'Buka minimal 4 karakter zodiak dalam koleksi.',
    rewardStars: 50,
    icon: '📖',
    current: 2,
    target: 4,
    unlocked: false,
    claimed: false
  },
  {
    id: 'island_explorer',
    title: 'Penakluk Pulau Awan',
    description: 'Kunjungi 5 pulau zodiak berbeda di peta kosmik.',
    rewardStars: 45,
    icon: '🗺️',
    current: 0,
    target: 5,
    unlocked: false,
    claimed: false
  },
  {
    id: 'star_collector',
    title: 'Gudang Bintang Emas',
    description: 'Kumpulkan total 300 bintang emas!',
    rewardStars: 60,
    icon: '⭐',
    current: 100,
    target: 300,
    unlocked: false,
    claimed: false
  }
];

// Rich 15+ Question Bank for GUESS THE ZODIAC
export const GUESS_ZODIAC_QUESTIONS = [
  {
    id: 1,
    characterId: 'aries',
    question: "Karakter zodiak manakah yang melambangkan domba jantan pemberani dengan elemen Api?",
    options: ["Aries", "Taurus", "Cancer", "Pisces"],
    correctIndex: 0,
    hint: "Lahir antara 21 Maret hingga 19 April!"
  },
  {
    id: 2,
    characterId: 'pisces',
    question: "Zodiak yang dilambangkan oleh sepasang ikan ajaib yang berenang bersama adalah...",
    options: ["Scorpio", "Aquarius", "Pisces", "Gemini"],
    correctIndex: 2,
    hint: "Elemen air yang sangat suka bermimpi indah."
  },
  {
    id: 3,
    characterId: 'leo',
    question: "Zodiak apakah yang memiliki simbol singa dan mahkota emas megah?",
    options: ["Aries", "Leo", "Gemini", "Pisces"],
    correctIndex: 1,
    hint: "Simbol singa agung dengan mahkota emas!"
  },
  {
    id: 4,
    characterId: 'libra',
    question: "Zodiak manakah yang memiliki simbol timbangan emas penyeimbang alam semesta?",
    options: ["Virgo", "Libra", "Taurus", "Scorpio"],
    correctIndex: 1,
    hint: "Lahir pada musim gugur antara September - Oktober."
  },
  {
    id: 5,
    characterId: 'gemini',
    question: "Karakter kembar ceria yang suka mengobrol dan berteman dengan siapa saja bernama...",
    options: ["Gemini", "Aries", "Leo", "Capricorn"],
    correctIndex: 0,
    hint: "Memiliki simbol kembar dua (♊)."
  },
  {
    id: 6,
    characterId: 'taurus',
    question: "Zodiak banteng imut yang sabar, setia, dan suka makan camilan manis adalah...",
    options: ["Taurus", "Cancer", "Aquarius", "Virgo"],
    correctIndex: 0,
    hint: "Elemen tanah yang lahir di bulan April-Mei."
  },
  {
    id: 7,
    characterId: 'cancer',
    question: "Karakter pemalu yang tinggal di cangkang mutiara dan sangat sayang keluarga adalah...",
    options: ["Cancer (Kepiting)", "Scorpio", "Pisces", "Leo"],
    correctIndex: 0,
    hint: "Dikuasai oleh Bulan dengan elemen air lembut."
  },
  {
    id: 8,
    characterId: 'virgo',
    question: "Peri mungil yang suka kerapian dan membawa buku catatan bintang bernama...",
    options: ["Libra", "Virgo", "Gemini", "Aries"],
    correctIndex: 1,
    hint: "Karakter yang sangat teliti dan bijak."
  },
  {
    id: 9,
    characterId: 'scorpio',
    question: "Kalajengking kristal biru misterius dengan ekor berpendar bintang adalah...",
    options: ["Scorpio", "Cancer", "Sagittarius", "Pisces"],
    correctIndex: 0,
    hint: "Simbol kalajengking dengan tekad kuat."
  },
  {
    id: 10,
    characterId: 'sagittarius',
    question: "Pemanah ceria yang suka meluncur melewati komet dan berjiwa petualang bebas adalah...",
    options: ["Capricorn", "Sagittarius", "Aries", "Leo"],
    correctIndex: 1,
    hint: "Memiliki lambang busur dan anak panah bintang!"
  },
  {
    id: 11,
    characterId: 'capricorn',
    question: "Kambing laut kecil yang rajin, disiplin, dan suka mendaki puncak es adalah...",
    options: ["Taurus", "Capricorn", "Aquarius", "Virgo"],
    correctIndex: 1,
    hint: "Lahir di akhir Desember hingga pertengahan Januari."
  },
  {
    id: 12,
    characterId: 'aquarius',
    question: "Karakter pembawa guci air bintang yang penuh dengan ide-ide kreatif dan inovatif adalah...",
    options: ["Aquarius", "Pisces", "Cancer", "Libra"],
    correctIndex: 0,
    hint: "Meskipun membawa air, elemennya adalah Udara!"
  },
  {
    id: 13,
    characterId: 'pisces',
    question: "Berapa jumlah total rasi bintang zodiak utama yang ada di Zodiac World?",
    options: ["10 Rasi", "12 Rasi", "14 Rasi", "8 Rasi"],
    correctIndex: 1,
    hint: "Sama seperti jumlah bulan dalam satu tahun!"
  },
  {
    id: 14,
    characterId: 'aries',
    question: "Maskot bintang biru imut yang selalu menemanimu di Zodiac World bernama...",
    options: ["Starry", "Bloo", "Cosmo", "Twinkle"],
    correctIndex: 1,
    hint: "Warnanya biru langit menggemaskan dan suka tertawa!"
  },
  {
    id: 15,
    characterId: 'cancer',
    question: "Manakah di bawah ini yang merupakan kelompok zodiak berelemen AIR?",
    options: [
      "Cancer, Scorpio, Pisces",
      "Aries, Leo, Sagittarius",
      "Taurus, Virgo, Capricorn",
      "Gemini, Libra, Aquarius"
    ],
    correctIndex: 0,
    hint: "Kepiting, Kalajengking, dan Ikan Ajaib!"
  },
  {
    id: 16,
    characterId: 'leo',
    question: "Manakah zodiak berelemen API yang dikenal sangat optimis dan penuh semangat berkobar?",
    options: [
      "Aries, Leo, Sagittarius",
      "Cancer, Scorpio, Pisces",
      "Taurus, Virgo, Capricorn",
      "Gemini, Libra, Aquarius"
    ],
    correctIndex: 0,
    hint: "Domba Api, Singa Emas, dan Pemanah Komet!"
  }
];

// Rich Questions for COSMIC QUIZ (Timed)
export const COSMIC_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Jika temanmu lahir tanggal 10 April, apakah zodiaknya?",
    options: ["Aries", "Taurus", "Pisces", "Gemini"],
    correctIndex: 0
  },
  {
    id: 2,
    question: "Zodiak apa yang memiliki simbol dua garis paralel melengkung ♊?",
    options: ["Taurus", "Gemini", "Cancer", "Libra"],
    correctIndex: 1
  },
  {
    id: 3,
    question: "Elemen apa yang menaungi zodiak Taurus, Virgo, dan Capricorn?",
    options: ["Tanah / Bumi", "Api", "Air", "Udara"],
    correctIndex: 0
  },
  {
    id: 4,
    question: "Bintang terdekat dengan planet Bumi di tata surya kita adalah...",
    options: ["Matahari", "Sirius", "Polaris", "Alpha Centauri"],
    correctIndex: 0
  },
  {
    id: 5,
    question: "Siapakah nama maskot bintang biru di Zodiac World?",
    options: ["Bloo", "Bluey", "Starlight", "Sky"],
    correctIndex: 0
  },
  {
    id: 6,
    question: "Zodiak yang memiliki rentang tanggal antara 23 Juli hingga 22 Agustus adalah...",
    options: ["Cancer", "Leo", "Virgo", "Libra"],
    correctIndex: 1
  },
  {
    id: 7,
    question: "Batu keberuntungan safir langit biasanya dikaitkan dengan zodiak yang teliti yaitu...",
    options: ["Virgo", "Aries", "Leo", "Scorpio"],
    correctIndex: 0
  },
  {
    id: 8,
    question: "Jika seseorang lahir pada tanggal 1 Januari, maka zodiaknya adalah...",
    options: ["Sagittarius", "Capricorn", "Aquarius", "Pisces"],
    correctIndex: 1
  }
];

// Riddles for WHO AM I? (Siapakah Aku?)
export const WHO_AM_I_ROSTER = [
  {
    id: 'aries',
    name: 'Aries',
    clues: [
      "1. Aku domba kecil yang memiliki tanduk emas melingkar di kepalaku.",
      "2. Elemenku adalah Api yang berkobar, dan aku lahir di awal musim semi.",
      "3. Aku paling suka menjadi yang nomor satu dan selalu memimpin barisan!"
    ]
  },
  {
    id: 'leo',
    name: 'Leo',
    clues: [
      "1. Aku mengenakan mahkota emas berkilauan dan surai berbulu lembut.",
      "2. Dikuasai oleh sang Mentari hangat, dan selalu mencintai teman-temanku.",
      "3. Simbol hewanku adalah raja hutan yang perkasa dan dermawan!"
    ]
  },
  {
    id: 'pisces',
    name: 'Pisces',
    clues: [
      "1. Tubuhku bersisik biru berkilau dan aku bisa berenang di samudra bintang.",
      "2. Aku sering melamunkan impian-impian manis dan memiliki hati lembut.",
      "3. Kami selalu berenang berpasangan, dua ekor ikan ajaib!"
    ]
  },
  {
    id: 'libra',
    name: 'Libra',
    clues: [
      "1. Aku memiliki sayap starlight dan satu-satunya zodiak benda mati.",
      "2. Tugasku adalah menjaga keadilan dan keseimbangan di alam semesta.",
      "3. Aku membawa timbangan emas yang tak pernah miring sebelah!"
    ]
  },
  {
    id: 'cancer',
    name: 'Cancer',
    clues: [
      "1. Aku tinggal di pesisir pantai biru dan menyukai mutiara bulan.",
      "2. Aku memiliki capit kecil imut tapi hatiku sangat lembut dan pemalu.",
      "3. Hewan air cangkang berkaki sepuluh yang suka berjalan menyamping!"
    ]
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    clues: [
      "1. Aku membawa busur panah bercahaya dan suka melesat menembus galaksi.",
      "2. Karakterku separuh manusia dan separuh kuda komet yang lincah.",
      "3. Aku paling benci diam di tempat dan selalu mencari petualangan baru!"
    ]
  }
];
