// Toda a coleção de conteúdo — adicionar/editar aqui

export const books = [
  // --- Da estante do SpaceHey ---
  { id: 'b01', title: 'Dom Casmurro',                   author: 'Machado de Assis',         genre: 'Realismo',         year: 1899, color: 'red',    size: 'lg' },
  { id: 'b02', title: 'A Metamorfose',                  author: 'Franz Kafka',               genre: 'Absurdismo',       year: 1915, color: 'teal',   size: 'md' },
  { id: 'b03', title: 'O Pequeno Príncipe',              author: 'Antoine de Saint-Exupéry', genre: 'Fantasia',         year: 1943, color: 'navy',   size: 'sm' },
  { id: 'b04', title: 'Cem Anos de Solidão',             author: 'Gabriel García Márquez',    genre: 'Realismo Mágico',  year: 1967, color: 'brown',  size: 'xl' },
  { id: 'b05', title: '1984',                            author: 'George Orwell',             genre: 'Distopia',         year: 1949, color: 'dark',   size: 'md' },
  { id: 'b06', title: 'A Revolução dos Bichos',          author: 'George Orwell',             genre: 'Sátira',           year: 1945, color: 'moss',   size: 'sm' },
  { id: 'b07', title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis',         genre: 'Realismo',         year: 1881, color: 'void',   size: 'md' },
  { id: 'b08', title: 'Grande Sertão: Veredas',          author: 'João Guimarães Rosa',      genre: 'Modernismo',       year: 1956, color: 'wine',   size: 'lg' },
  // --- Gótico / terror (coleção pessoal) ---
  { id: 'b09', title: 'O Morro dos Ventos Uivantes',    author: 'Emily Brontë',              genre: 'Gótico',           year: 1847, color: 'purple', size: 'lg' },
  { id: 'b10', title: 'Drácula',                         author: 'Bram Stoker',               genre: 'Horror',           year: 1897, color: 'red',    size: 'xl' },
  { id: 'b11', title: 'Frankenstein',                    author: 'Mary Shelley',              genre: 'Horror Gótico',    year: 1818, color: 'dark',   size: 'md' },
  { id: 'b12', title: 'O Retrato de Dorian Gray',        author: 'Oscar Wilde',               genre: 'Gótico',           year: 1890, color: 'teal',   size: 'md' },
  { id: 'b13', title: 'Contos de Terror',                author: 'Edgar Allan Poe',           genre: 'Horror',           year: 1839, color: 'void',   size: 'sm' },
  { id: 'b14', title: 'Entrevista com o Vampiro',        author: 'Anne Rice',                 genre: 'Dark Romance',     year: 1976, color: 'wine',   size: 'lg' },
];

export const albums = [
  { id: 'a01', title: 'The Black Parade',              artist: 'My Chemical Romance', genre: 'Emo',           year: 2006, emoji: '🖤' },
  { id: 'a02', title: 'Three Cheers for Sweet Revenge', artist: 'My Chemical Romance', genre: 'Emo',           year: 2004, emoji: '💀' },
  { id: 'a03', title: 'Disintegration',                 artist: 'The Cure',            genre: 'Post-Punk',     year: 1989, emoji: '🌑' },
  { id: 'a04', title: 'Unknown Pleasures',              artist: 'Joy Division',         genre: 'Post-Punk',     year: 1979, emoji: '🌊' },
  { id: 'a05', title: 'Hybrid Theory',                  artist: 'Linkin Park',          genre: 'Nu Metal',      year: 2000, emoji: '⚙️' },
  { id: 'a06', title: 'Fallen',                         artist: 'Evanescence',          genre: 'Gothic Rock',   year: 2003, emoji: '🕯️' },
  { id: 'a07', title: 'From Under the Cork Tree',       artist: 'Fall Out Boy',         genre: 'Pop Punk',      year: 2005, emoji: '🍂' },
  { id: 'a08', title: 'October Rust',                   artist: 'Type O Negative',      genre: 'Gothic Metal',  year: 1996, emoji: '🥀' },
  { id: 'a09', title: 'Pretty. Odd.',                   artist: 'Panic! at the Disco',  genre: 'Pop Rock',      year: 2008, emoji: '🎩' },
  { id: 'a10', title: 'Meteora',                        artist: 'Linkin Park',          genre: 'Nu Metal',      year: 2003, emoji: '⚡' },
];

export const movies = [
  { id: 'm01', title: 'O Estranho Mundo de Jack',   director: 'Henry Selick',       genre: 'Fantasia Sombria',    year: 1993, emoji: '🎄' },
  { id: 'm02', title: 'Edward Mãos de Tesoura',     director: 'Tim Burton',          genre: 'Fantasia Gótica',     year: 1990, emoji: '✂️' },
  { id: 'm03', title: 'O Labirinto do Fauno',        director: 'Guillermo del Toro', genre: 'Fantasia Sombria',    year: 2006, emoji: '🦋' },
  { id: 'm04', title: 'A Noiva Cadáver',             director: 'Tim Burton',          genre: 'Animação Gótica',     year: 2005, emoji: '💍' },
  { id: 'm05', title: 'Coraline',                    director: 'Henry Selick',       genre: 'Terror Infantil',     year: 2009, emoji: '🧵' },
  { id: 'm06', title: 'Donnie Darko',                director: 'Richard Kelly',      genre: 'Ficção Psicológica',  year: 2001, emoji: '🐰' },
  { id: 'm07', title: 'Beetlejuice',                 director: 'Tim Burton',          genre: 'Comédia Sombria',     year: 1988, emoji: '👻' },
  { id: 'm08', title: 'Entrevista com o Vampiro',    director: 'Neil Jordan',         genre: 'Horror Gótico',       year: 1994, emoji: '🧛' },
  { id: 'm09', title: 'The Craft',                   director: 'Andrew Fleming',      genre: 'Terror Sobrenatural', year: 1996, emoji: '🔮' },
  { id: 'm10', title: 'Os Outros',                   director: 'Alejandro Amenábar', genre: 'Terror Psicológico',  year: 2001, emoji: '🚪' },
];

export const series = [
  { id: 's01', title: 'Penny Dreadful',                  creator: 'John Logan',        genre: 'Horror Gótico',     year: 2014, emoji: '🩸' },
  { id: 's02', title: 'A Maldição da Residência Hill',   creator: 'Mike Flanagan',     genre: 'Terror Psicológico', year: 2018, emoji: '🏠' },
  { id: 's03', title: 'Wednesday',                        creator: 'Alfred Gough',      genre: 'Fantasia Sombria',  year: 2022, emoji: '🖤' },
  { id: 's04', title: 'Dark',                             creator: 'Baran bo Odar',    genre: 'Sci-Fi Sombrio',    year: 2017, emoji: '⏳' },
  { id: 's05', title: 'Sandman',                          creator: 'Neil Gaiman',       genre: 'Fantasia Sombria',  year: 2022, emoji: '🌙' },
  { id: 's06', title: 'Stranger Things',                  creator: 'Irmãos Duffer',    genre: 'Ficção Nostálgica', year: 2016, emoji: '🚲' },
  { id: 's07', title: 'Arquivo X',                        creator: 'Chris Carter',      genre: 'Paranormal',        year: 1993, emoji: '🛸' },
  { id: 's08', title: 'Hannibal',                         creator: 'Bryan Fuller',      genre: 'Thriller',          year: 2013, emoji: '🍷' },
  { id: 's09', title: 'American Horror Story',            creator: 'Ryan Murphy',       genre: 'Horror Antologia',  year: 2011, emoji: '🎪' },
  { id: 's10', title: 'Buffy, a Caça-Vampiros',           creator: 'Joss Whedon',      genre: 'Fantasia',          year: 1997, emoji: '⚔️' },
];

export const games = [
  { id: 'g01', title: 'Silent Hill 2',                    developer: 'Konami',         genre: 'Horror Psicológico',  year: 2001, platform: 'PS2', emoji: '🌫️' },
  { id: 'g02', title: 'Castlevania: SOTN',                developer: 'Konami',         genre: 'Ação Gótica',         year: 1997, platform: 'PS1', emoji: '🏰' },
  { id: 'g03', title: 'Stardew Valley',                   developer: 'ConcernedApe',   genre: 'Cozy / Fazenda',      year: 2016, platform: 'PC',  emoji: '🌻' },
  { id: 'g04', title: 'Spiritfarer',                      developer: 'Thunder Lotus',  genre: 'Cozy / Narrativo',    year: 2020, platform: 'PC',  emoji: '⛵' },
  { id: 'g05', title: 'Hollow Knight',                    developer: 'Team Cherry',    genre: 'Metroidvania',        year: 2017, platform: 'PC',  emoji: '🦋' },
  { id: 'g06', title: "American McGee's Alice",           developer: 'Rogue',          genre: 'Fantasia Sombria',    year: 2000, platform: 'PC',  emoji: '🐇' },
  { id: 'g07', title: "Majora's Mask",                    developer: 'Nintendo',       genre: 'Fantasia Sombria',    year: 2000, platform: 'N64', emoji: '🎭' },
  { id: 'g08', title: 'Disco Elysium',                    developer: 'ZA/UM',          genre: 'RPG Narrativo',       year: 2019, platform: 'PC',  emoji: '🥃' },
  { id: 'g09', title: 'Shadow of the Colossus',           developer: 'Team Ico',       genre: 'Fantasia Épica',      year: 2005, platform: 'PS2', emoji: '🗿' },
  { id: 'g10', title: 'Resident Evil (1996)',              developer: 'Capcom',         genre: 'Survival Horror',     year: 1996, platform: 'PS1', emoji: '🧟' },
];
