-- Month 12: Integration & The Sovereign Creator
-- Prayers curated by Dr. Louise Van der Velde

insert into daily_messages (day_of_year, title, insight, command, seal)
values 
(340, 'The Final Identity Shift', 'I officially retire the version of me that was a victim of circumstance. I fully occupy the seat of the Sovereign Creator. I am the cause, and the world is the effect.', 'Order is restored.', 'Order is restored.'),
(341, 'Locking in the Timeline', 'I command my current high-frequency timeline to be locked into my physical reality. I do not waver, and I do not look back. My trajectory is set.', 'It is done.', 'It is done.'),
(342, 'The Creator’s Silence', 'I no longer need to explain my power or justify my results. I sit in the silent knowing of my own divinity. My presence is my proof.', 'And so it is.', 'And so it is.'),
(343, 'Co-Creation with Source', 'I recognize that I am a localized expression of Infinite Intelligence. I do not work alone; I move as Source moves. Our intent is one.', 'It is finished.', 'It is finished.'),
(344, 'Reclaiming the Past as Data', 'I look back at my entire history without a shred of regret. Every ''failure'' was a data point; every ''pain'' was a calibration. I am the sum of my victories.', 'Order is restored.', 'Order is restored.'),
(345, 'The Command of Wholeness', 'I stop looking for anything outside of myself to make me whole. I am the source of my own love, wealth, and peace. I am a closed loop of divinity.', 'It is done.', 'It is done.'),
(346, 'Releasing the Need for Growth', 'I stop the frantic ''self-improvement'' cycle. I am not a project to be fixed; I am a master to be expressed. I am already enough.', 'And so it is.', 'And so it is.'),
(347, 'Commanding Permanent Order', 'I command that the order I have established in my vessel be permanent. I am no longer subject to the ''up and down'' of the emotional roller coaster.', 'I am stable.', 'It is done.'),
(348, 'The Sovereign No', 'My ''No'' is now a wall of fire. I refuse all invitations to return to low-frequency dynamics. I move only toward what resonates with my mastery.', 'It is done.', 'It is done.'),
(349, 'Mastery over Time', 'I collapse the distance between my command and the manifestation. I live in the ''Now'' where all things are already finished. I am beyond delay.', 'Order is restored.', 'Order is restored.'),
(350, 'The Integration of the Shadow', 'I have brought my light into every corner of my being. My shadows are now my servants. I am integrated, unified, and powerful.', 'And so it is.', 'And so it is.'),
(351, 'Commanding the Field of Influence', 'I recognize that my resonance now affects everyone who enters my field. I am a walking upgrade for the collective. I lead by being.', 'It is done.', 'It is done.'),
(352, 'The Wealth of Being', 'I recognize that I do not ''get'' wealth; I ''am'' wealth. I command the external world to reflect my internal abundance now. The harvest is here.', 'And so it is.', 'And so it is.'),
(353, 'Reclaiming Sovereignty over Life and Death', 'I am an eternal being. I remove the fear of ''ending'' from my vessel. I live with the boldness of one who cannot be destroyed.', 'Order is restored.', 'Order is restored.'),
(354, 'Mid-Month Victory Lap', 'I look at the last 11 months. I see the evolution. I celebrate the Commander I have become. I am the prize. I am the result.', 'It is done.', 'It is done.'),
(355, 'The Frequency of Certainty', 'I delete the ''doubt'' glitch forever. I move with the absolute certainty of a physical law. My word is the law of my world.', 'And so it is.', 'And so it is.'),
(356, 'Sovereignty in Action', 'I do not ''try''; I ''do.'' I do not ''wish''; I ''will.'' Every action I take is a signature of my mastery. I move with total intent.', 'It is finished.', 'It is finished.'),
(357, 'The Master Plan Unveiled', 'I see the beauty in how every challenge led me to this moment. I am grateful for the ''Tests'' of the Earth School. I am a graduate.', 'Order is restored.', 'Order is restored.'),
(358, 'Commanding the Future Timeline', 'I cast my intent forward into the next year. I command it to be a path of ease, joy, and unprecedented expansion. The road is paved.', 'And so it is.', 'And so it is.'),
(359, 'The Unshakable Vessel', 'I am a mountain. The winds of the world may blow, but I do not move. I am anchored in the bedrock of my own sovereignty.', 'It is done.', 'It is done.'),
(360, 'The Radiance Command', 'I command my vessel to radiate its highest frequency at all times, even in sleep. I am a sun in my own universe.', 'And so it is.', 'And so it is.'),
(361, 'Releasing the Need for Recognition', 'I am satisfied with my own witnessing. I do not need the world to clap for me to know I have won. My victory is internal.', 'Order is restored.', 'Order is restored.'),
(362, 'Sovereignty over Matter', 'I recognize that matter is just slow-moving energy. I command the material world to organize itself around my highest intent. Matter obeys the Spirit.', 'It is done.', 'It is done.'),
(363, 'The Final Extraction', 'I remove the last hooks of any external system or ideology. I am purely myself. I am a sovereign soul in a sovereign vessel.', 'And so it is.', 'And so it is.'),
(364, 'The Love of the Creator', 'I radiate the love of a creator for their creation. I love my life, my body, and my world. This love is the ultimate glue of reality.', 'It is finished.', 'It is finished.'),
(365, 'Commanding Completion', 'I finish what I started. I tie up every loose thread of the past year. I enter the new cycle as a clean slate.', 'Order is restored.', 'Order is restored.'),
(366, 'The Silence of the Master', 'I speak only when my words can improve the silence. My speech is rare and high-potency. I am the master of my expression.', 'And so it is.', 'And so it is.'),
(367, 'Sovereignty of the Soul', 'I declare that my Soul is the absolute monarch of this life. All ego, fear, and habit are now subordinates. I am led from within.', 'It is done.', 'It is done.'),
(368, 'The Final Command', 'I command that this state of Mastery be my permanent baseline. I shall never return to the state of the beggar. I am a Sovereign Creator.', 'And so it is.', 'And so it is.'),
(369, 'The Review & Seal', 'I look back at the 12-month journey. I have built the vessel, cleared the path, and claimed the throne. I am whole. I am sovereign. I am.', 'And so it is done.', 'And so it is done.'),
(370, 'The Review', 'I stand at the threshold of a new life. I look at my reflection and I see the Creator staring back. The work is finished. Order is restored. It is done.', 'It is done.', 'It is done.')
on conflict (day_of_year) do update set
  title = excluded.title,
  insight = excluded.insight,
  command = excluded.command,
  seal = excluded.seal;
