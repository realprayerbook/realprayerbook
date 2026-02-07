-- Month 7: Graduation Events & Resilience
-- Prayers curated by Dr. Louise Van der Velde

insert into daily_messages (day_of_year, title, insight, command, seal)
values 
(185, 'The Reframing', 'I stop labeling challenges as ''problems.'' I recognize them as tailored exams for my evolution. I am not a victim of circumstance; I am a student in mastery.', 'Order is restored.', 'Order is restored.'),
(186, 'The Training Ground', 'I ask the logical question: ''What is this training me for?'' I stop resisting the lesson and start absorbing the skill. I am being forged for greatness.', 'It is done.', 'It is done.'),
(187, 'Composure under Pressure', 'I command my nervous system to remain regulated while the world feels like chaos. I am the eye of the hurricane. My peace is my power.', 'And so it is.', 'And so it is.'),
(188, 'Trusting the Master Plan', 'I acknowledge that my limited perspective cannot see the whole map. I command myself to trust the intelligence of the Master Plan. Everything is moving in my favor.', 'Everything is moving in my favor.', 'It is done.'),
(189, 'Reclaiming the ''Why Me'' Energy', 'I withdraw from the frequency of self-pity. I am not being picked on; I am being picked out. I am the chosen one for this specific task.', 'I am ready.', 'It is done.'),
(190, 'The Pivot Point', 'I recognize that when things break, it is to make room for a higher order. I stop gluing the old pieces together. I am ready for the new.', 'Order is restored.', 'Order is restored.'),
(191, 'Commanding Endurance', 'I do not ask for the burden to be light; I command my shoulders to be strong. I have the stamina to see this graduation through to the end.', 'It is done.', 'It is done.'),
(192, 'Dissolving the Crisis', 'I strip the ''emergency'' label off this moment. I look at the facts without the fear. I command the solution to present itself to my clear mind.', 'And so it is.', 'And so it is.'),
(193, 'The Observer Stance', 'I step back from the drama. I watch the ''test'' as if it were a movie. I am the director, not the extra. I choose the ending.', 'I am sovereign.', 'It is done.'),
(194, 'Releasing the Need for Ease', 'I recognize that growth happens in the stretch. I stop demanding that life be easy and start commanding that I be capable.', 'I am expanding.', 'It is done.'),
(195, 'Facing the Shadow', 'I do not run from the dark parts of the exam. I bring my light into the shadow and I command the truth to be revealed. I am not afraid.', 'Order is restored.', 'Order is restored.'),
(196, 'The Frequency of Victory', 'I align with the version of me that has already passed this test. I feel the relief of the graduation now. I am already on the other side.', 'It is done.', 'It is done.'),
(197, 'Neutralizing the Antagonist', 'I stop seeing people as ''enemies'' and start seeing them as ''sparring partners.'' They are here to help me find my strength. I thank them for the training.', 'I thank them for the training.', 'And so it is.'),
(198, 'Strength in the Marrow', 'I command my inner core to be immovable. No matter what shifts on the surface, my foundation is solid. I am anchored in my own divinity.', 'And so it is.', 'And so it is.'),
(199, 'Mid-Month Graduation Check', 'I look at the last 14 days. I see where I stayed regulated and where I tripped. I take the data, leave the judgment, and keep going.', 'I am winning.', 'It is done.'),
(200, 'Commanding Clarity in Chaos', 'When the noise is loudest, my internal signal is clearest. I command the next logical step to illuminate. I move with precision.', 'Order is restored.', 'Order is restored.'),
(201, 'Reclaiming My Power from Events', 'I refuse to let an event dictate my mood. I am the source of my own frequency. I stay high, even when the world goes low.', 'It is done.', 'It is done.'),
(202, 'The Divine ''No''', 'I recognize that a closed door is a graduation from a path that was too small for me. I do not bang on it; I turn toward the open horizon.', 'I am protected.', 'It is done.'),
(203, 'Mastering the Friction', 'I use the friction of this moment to create heat and light. I am being polished, not worn down. I am becoming a diamond.', 'And so it is.', 'And so it is.'),
(204, 'Releasing the Victim Script', 'I delete the ''poor me'' program from my consciousness. It is a parasitic overlay. I am the Commander of my destiny. I am the Victor.', 'Order is restored.', 'Order is restored.'),
(205, 'The Sovereignty of Choice', 'I may not choose the test, but I always choose my response. I choose power. I choose logic. I choose alignment. I am the master here.', 'I am the master here.', 'It is done.'),
(206, 'Trusting the Timing', 'I stop trying to rush the graduation. I stay in the classroom until the lesson is fully integrated. I am patient because I am powerful.', 'It is done.', 'It is done.'),
(207, 'Withdrawing from the ''Crash''', 'I refuse to participate in the collective panic. While others see a crash, I see a restructuring. I am positioned for the upgrade.', 'And so it is.', 'And so it is.'),
(208, 'Commanding Courage', 'I do not hope for courage; I command it to rise from my DNA. I am built for this density. I am a warrior of the light.', 'Order is restored.', 'Order is restored.'),
(209, 'The Alchemy of Pain', 'I take the pain of the past and I transmute it into the wisdom of the future. I do not waste my suffering; I use it as fuel.', 'I am an alchemist.', 'It is done.'),
(210, 'The Integrity Test', 'I command myself to stay in integrity even when it is difficult. My word is my bond to the field. I am a high-reliability system.', 'It is done.', 'It is done.'),
(211, 'Releasing the ''Why''', 'I stop needing to understand the ''why'' behind every challenge. I focus on the ''How''—how I will rise, how I will lead, how I will win.', 'I am winning.', 'It is done.'),
(212, 'Graduation Day Near', 'I feel the pressure beginning to lift. I do not relax my discipline yet. I finish strong. I am the closer.', 'And so it is.', 'And so it is.'),
(213, 'Final Exam Review', 'I look at the obstacles and I see them as stepping stones. I am higher than I was 30 days ago. The Earth School is my playground.', 'Order is restored.', 'Order is restored.'),
(214, 'The Review & Seal', 'I look back at Month 7. I am no longer afraid of challenges; I am challenged by my own potential. I have graduated. I am elevated.', 'And so it is done.', 'And so it is done.'),
(215, 'The Review', 'I stand at the top of the mountain of this month''s lessons. I am stronger, wiser, and more regulated. I have passed the test. I am ready for the next level.', 'And so it is.', 'And so it is.')
on conflict (day_of_year) do update set
  title = excluded.title,
  insight = excluded.insight,
  command = excluded.command,
  seal = excluded.seal;
