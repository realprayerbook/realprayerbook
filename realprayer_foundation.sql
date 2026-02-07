-- RealPrayer Foundation Script
-- This script creates the core engagement tables and populates Month 1 data.

-- 1. Create Daily Messages Table
create table if not exists daily_messages (
  id uuid primary key default gen_random_uuid(),
  day_of_year integer unique not null,
  title text not null,
  insight text not null,
  command text not null,
  seal text not null default 'Order is restored. And so it is done.',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Daily Messages
alter table daily_messages enable row level security;
drop policy if exists "Anyone can read daily messages" on daily_messages;
create policy "Anyone can read daily messages" on daily_messages
  for select to authenticated using (true);

-- 2. Create User Visits Table
create table if not exists user_visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  visit_date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, visit_date)
);

-- RLS for User Visits
alter table user_visits enable row level security;
drop policy if exists "Users can only see their own visits" on user_visits;
create policy "Users can only see their own visits" on user_visits
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Users can only insert their own visits" on user_visits;
create policy "Users can only insert their own visits" on user_visits
  for insert to authenticated with check (auth.uid() = user_id);

-- 3. Populate Month 1: The Foundation of Coherence
insert into daily_messages (day_of_year, title, insight, command, seal)
values 
(1, 'The Reset', 'Divine Source, I acknowledge that I am in Earth School. I withdraw my energy from past timelines and future worry. I command my nervous system to regulate now.', 'I do not beg for a good day; I align with the intelligence that orders it.', 'I am present. I am ready. It is done.'),
(2, 'Clearing the Vessel', 'I release all that is not my own. I command any interference or parasitic overlays to leave my field immediately. My body is a vessel for Divine Intelligence.', 'I stand in my own authority. Nothing enters without my permission.', 'I am clear. Order is restored.'),
(3, 'Lowering Importance', 'I release the need to control the ''how.'' I lower the importance of my problems, knowing they are small compared to the Intelligence that guides me.', 'I step out of urgency and into knowing. The solution is already here. I simply align to receive it.', 'Thank you that it is done.'),
(4, 'Commanding Abundance', 'I do not chase resources; I command alignment with them. I withdraw my energy from the illusion of scarcity.', 'I instruct my reality to reflect value, dignity, and flow. I am open to receive from unexpected sources.', 'My provision is assured. And so it is.'),
(5, 'Navigating Chaos', 'When the world is noisy, I am the stillness. I do not react; I orient.', 'I command my field to remain coherent regardless of the external storm. I am the anchor. Clarity finds me because I am stable.', 'I move with precision. It is done.'),
(6, 'Releasing the Past', 'I revoke all unconscious agreements made in pain or trauma. I call my power back from yesterday.', 'I forgive to free myself, not to condone others. I stand fully in today. My history does not dictate my trajectory.', 'I am free to create now.'),
(7, 'Nervous System Regulation', 'I inhale safety; I exhale threat. I command my body to stand down from survival mode.', 'I am safe. I am held. I am supported by the Earth and the Ether. My capacity is restored.', 'Guidance can now land. And so it is.'),
(8, 'For the Unknown', 'I face the unknown without fear. Uncertainty is simply the space where creation happens. I trust the Master Plan.', 'I do not need to see the whole staircase to take the first step. Show me, guide me. I move when the signal is clear.', 'It is done.'),
(9, 'Divine Protection', 'I place a shield of light around my field. I command that only truth and love may enter.', 'I am invisible to malice and visible to opportunity. I walk in the authority of source.', 'I am protected. I am whole.'),
(10, 'Authority Over Health', 'I speak to my cells: return to your original blueprint of health. I command inflammation to cool and energy to rise.', 'My body is an intelligent system, and I instruct it to repair. I treat this vessel with honor.', 'I am vital. I am strong.'),
(11, 'The Mirror of Relationships', 'I withdraw my energy from projection and blame. I ask: ''What is this teaching me?'' I command clarity in my connections.', 'I release the need to fix others. I stand in my own sovereignty, allowing others their path.', 'My relationships reflect my peace. It is done.'),
(12, 'Success in Business', 'I do not hustle from fear; I build from alignment. I command my work to serve life.', 'I call in the collaborators, opportunities, and resources that match my highest timeline. I withdraw energy from stress and invest it in vision.', 'Success is natural. Order is restored.'),
(13, 'Truth & Discernment', 'I ask for the eyes to see what is real. I strip away the noise of ''fake gurus'' and distraction.', 'I trust my gut—my internal truth instrument. If it feels heavy, I release it. If it feels light, I follow it.', 'I am discerning. I am wise.'),
(14, 'Family Healing', 'I honor my lineage but I do not carry its burdens. I release generational trauma that stops with me. I command peace over my family line.', 'I send love to my ancestors and claim freedom for my descendants. The cycle of pain ends here.', 'Love remains.'),
(15, 'The Power of Silence', 'Today, I choose silence over chatter. I listen more than I speak. In the silence, I hear the instruction of the Divine.', 'I quiet the mind so the soul can lead. I am a clear channel. Guidance flows when I am still.', 'It is done.'),
(16, 'Transforming Pressure', 'Pressure is not punishment; it is preparation. I ask: ''What is this training me for?'' I expand my capacity to hold more.', 'I do not break; I graduate. I welcome the test because I know I have the tools to pass.', 'I am upgrading. And so it is.'),
(17, 'Reclaiming Energy', 'I call my energy back from every conversation, worry, and screen that has drained me. I zip up my field.', 'I am a closed circuit of power. I do not leak vitality. I direct my focus only where it serves the highest good.', 'I am replenished.'),
(18, 'Trusting Timing', 'I release the addiction to ''now.'' I trust the divine timing of my life. What is meant for me will not pass me by.', 'I stop pushing the river. I float in the current of Divine Will. I am exactly where I need to be.', 'Peace is mine.'),
(19, 'The ''No'' as Protection', 'I thank Source for the closed doors. I accept the ''no'' as divine protection. I do not force what has been blocked.', 'I pivot with grace. I trust that something better is being prepared. I am guided away from harm and toward destiny.', 'It is done.'),
(20, 'Gratitude as a Signal', 'I do not wait for the miracle to be grateful; I am grateful now, and the miracle follows.', 'Gratitude is my signal of reception. I appreciate the breath in my lungs and the ground beneath my feet.', 'I am rich in life. Thank you.'),
(21, 'Overcoming Doubt', 'Doubt is just noise in the signal. I turn the volume down on fear and up on faith. I know who I am.', 'I am a co-creator with the Divine. I command my confidence to rise. I step forward with certainty.', 'I am supported.'),
(22, 'The Element of Water (Flow)', 'Like water, I move around obstacles, not through them. I cleanse my emotional field. I wash away the stagnation of yesterday.', 'I am fluid, adaptable, and powerful. I trust the flow of life to carry me to the ocean of abundance.', 'It is done.'),
(23, 'The Element of Earth (Grounding)', 'I am anchored. My roots go deep into the Earth. I am stable, practical, and real. I do not float in fantasy; I build in reality.', 'I command my physical world to organize. I am safe in my body. I am home.', 'It is done.'),
(24, 'The Element of Fire (Action)', 'I ignite the will to act. I burn away procrastination and lethargy. I move with swift precision.', 'I am the spark that creates change. I command my actions to be effective and aligned. I am the fire of transformation.', 'And so it is.'),
(25, 'The Element of Air (Clarity)', 'I invite the winds of change. I breathe in inspiration and breathe out confusion. My mind is sharp like a sword.', 'I communicate with truth. I see the big picture. The fog lifts. I know what to do.', 'It is done.'),
(26, 'Healing the Heart', 'I command my heart to remain open, even after pain. I refuse to close off. I transmute grief into wisdom.', 'I am brave enough to love again. I attract love that is safe, honorable, and true. My heart is a fortress of light.', 'It is done.'),
(27, 'Breaking Addiction/Habit', 'I am the master of my vessel. I withdraw my permission from habits that weaken me. I command my brain to rewire for freedom.', 'I do not need crutches; I have connection. I fill the void with Divine presence.', 'I am free.'),
(28, 'Joy as Resistance', 'I choose joy as an act of rebellion against the chaos. I will laugh, dance, and play.', 'I raise my frequency so high that low-vibe interference cannot touch me. Joy is my shield. I am alive and I love it.', 'Thank you.'),
(29, 'Surrender to the Master Plan', 'I hand the pen back to the Creator. Write my story. I surrender my small plans for your Master Plan.', 'I trust that the plot twists are in my favor. I relax into the passenger seat. Drive me to my destiny.', 'It is done.'),
(30, 'Completion', 'I finish what I start. I close the loops. I do not drag unfinished business into tomorrow.', 'I command focus and endurance. I honor my commitments. I am a person of my word.', 'Order is established. It is done.'),
(31, 'The Review', 'I look back without judgment. I take the lessons and leave the pain. I see how I have grown.', 'I celebrate my survival and my expansion. I am not the same person I was 31 days ago. I am stronger. I am ready for what is next.', 'And so it is.')
on conflict (day_of_year) do update set
  title = excluded.title,
  insight = excluded.insight,
  command = excluded.command,
  seal = excluded.seal;
