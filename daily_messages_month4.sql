-- Month 4: Provision & The Sovereign Flow
-- Prayers curated by Dr. Louise Van der Velde

insert into daily_messages (day_of_year, title, insight, command, seal)
values 
(93, 'The New Currency', 'I recognize that my frequency is my primary currency. I stop chasing the paper and start commanding the resonance.', 'I am a magnet for value.', 'Order is restored.'),
(94, 'Releasing the ''How''', 'I surrender the ''how'' to the intelligence of the system. My job is the ''what'' and the ''why.''', 'I command the path to open in ways I cannot yet see.', 'It is done.'),
(95, 'Reclaiming the Hustle', 'I withdraw from the addiction to ''hard work'' as a badge of honor. I replace struggle with precision.', 'I am not a worker; I am a creator. My flow is effortless.', 'It is done.'),
(96, 'Commanding Resources', 'I command the resources required for my mission to appear in my field now. I do not hope for them; I instruct them to consolidate.', 'The supply is infinite.', 'It is done.'),
(97, 'Business as Service', 'I align my work with the expansion of life. My business is a vessel for service, and therefore it is backed by the laws of the universe.', 'I am supported.', 'It is done.'),
(98, 'Releasing Scarcity Static', 'I identify the ''not enough'' frequency as a glitch in my programming. I delete it now.', 'I live in a field of perpetual provision.', 'And so it is.'),
(99, 'The Divine Timing', 'I stop the internal clock of anxiety. I recognize that urgency is an interference.', 'I align with the perfect timing of the Master Plan. I am never late.', 'It is done.'),
(100, 'Withdrawing from Competition', 'I withdraw from the frequency of competition. No one can do what I do, how I do it.', 'I am in a category of one. My market is my own vibration.', 'It is done.'),
(101, 'The Value Signal', 'I focus on the value I provide, not the price I charge.', 'I command my signal to reach those who are looking for exactly what I have. The match is made.', 'It is done.'),
(102, 'Ending the Addiction to Struggle', 'I see where I have used ''struggle'' to feel worthy. I drop that contract today.', 'I am worthy because I exist. Success is my natural state.', 'Order is restored.'),
(103, 'Reclaiming My Time', 'I command my time to expand. I refuse to be a slave to the calendar.', 'I prioritize my alignment over my inbox. I am the master of my days.', 'It is done.'),
(104, 'Clearing Money Trauma', 'I sever the link between my bank account and my self-worth. I am not the numbers on a screen; I am the power that generates them.', 'I am wealthy by design.', 'It is done.'),
(105, 'Commanding the Gates to Open', 'I command every closed door that no longer serves my evolution to remain shut, and every door aligned with my destiny to swing open now.', 'I walk through.', 'It is done.'),
(106, 'The Zero-Resistance State', 'I lower the importance of the outcome. I know it is done, so I stop gripping the wheel.', 'I move with zero resistance. I am in the flow.', 'It is done.'),
(107, 'Mid-Month Audit', 'I look at my projects and I prune what is dead. I stop watering what does not grow.', 'I focus my power on the seeds that are ready to bloom. I am efficient.', 'It is done.'),
(108, 'The Magnetism of Joy', 'I recognize that joy is a mechanical signal for abundance. I refuse to be heavy about my business.', 'I laugh, I play, and I attract.', 'It is done.'),
(109, 'Releasing Comparison', 'I delete the ''comparison'' program. I am on my own timeline. I celebrate the success of others as proof that the field is working.', 'My turn is now.', 'It is done.'),
(110, 'Commanding Visibility', 'I command my work to be seen by the right eyes. I remove the cloak of invisibility.', 'I am ready to be witnessed in my mastery.', 'Order is restored.'),
(111, 'The Wealth Vessel', 'I command my capacity to hold wealth to expand. I am no longer afraid of large numbers.', 'I am a stable vessel for massive resources.', 'And so it is.'),
(112, 'Releasing the ''Rescue'' Fantasy', 'I stop waiting for a ''big break'' or a ''savior.'' I am the break. I am the savior.', 'I command my own reality into existence today.', 'It is done.'),
(113, 'Financial Sovereignty', 'I revoke all contracts of debt and lack. I am a sovereign financial entity.', 'I command my accounts to reflect the order of my mind. I am solvent.', 'It is done.'),
(114, 'The Alignment Check', 'I check my ''Why.'' If I am acting from fear, I stop. I only move when I am in alignment.', 'My actions are high-potency because they are pure.', 'It is done.'),
(115, 'Reclaiming Energy Leaks', 'I stop giving my work away to those who do not value it. I command a fair exchange in all my dealings.', 'I value myself, and the field reflects it.', 'It is done.'),
(116, 'The Legacy Command', 'I am not just building a career; I am building a legacy. I command my work to outlive my effort.', 'I create things of permanent value.', 'It is done.'),
(117, 'Commanding Synchronicity', 'I command the ''perfect coincidences'' to find me today. I align with the people, places, and things that accelerate my mission.', 'I am a match.', 'It is done.'),
(118, 'Releasing the Need to Know', 'I drop the need to understand every step of the journey. I trust the intelligence of the field to navigate the details.', 'I simply walk. I am guided.', 'It is done.'),
(119, 'The Abundance Shield', 'I shield my business from the economic fears of the collective. I do not participate in ''recessions.''', 'I operate in a private economy of light.', 'It is done.'),
(120, 'Commanding Clarity', 'I command the next step to be made clear. I remove the fog of ''what if.''', 'I see the path, and I take it with total confidence.', 'Order is restored.'),
(121, 'The Harvest Command', 'I command the seeds I have sown to come to harvest now. I am ready to receive the fruits of my alignment.', 'I open my hands. I accept.', 'It is done.'),
(122, 'The Review & Seal', 'I look back at 30 days of provision. I am no longer a ''hustler''; I am a ''Commander of Flow.''', 'I trust the system. I know my value.', 'And so it is done.')
on conflict (day_of_year) do update set
  title = excluded.title,
  insight = excluded.insight,
  command = excluded.command,
  seal = excluded.seal;
