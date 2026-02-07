-- Month 2: The Sovereign Vessel
-- Prayers curated by Dr. Louise Van der Velde

insert into daily_messages (day_of_year, title, insight, command, seal)
values 
(32, 'The Reset', 'I release the addiction to tension. I drop my shoulders and my guard. I command my body to recognize that the war is over.', 'I am safe in my skin.', 'Order is restored.'),
(33, 'The Breath Signal', 'I use my breath as a master key. With every exhale, I signal my cells to stand down from high alert.', 'I am the anchor in the storm.', 'It is done.'),
(34, 'Discernment', 'I distinguish between real danger and familiar discomfort. I refuse to let my pulse be dictated by shadows of the past.', 'I am calm, clear, and present.', 'It is done.'),
(35, 'The Slow Down', 'I withdraw from the frantic frequency of the world. My peace is not for sale.', 'I move at the speed of my own alignment. I am in control.', 'It is done.'),
(36, 'Grounding', 'I send my energy deep into the Earth. I am not a floating head; I am a grounded force.', 'Static leaves me; stability enters me. I am anchored.', 'It is done.'),
(37, 'Cellular Repair', 'I speak directly to my biology. I command my cells to regenerate in a field of peace. I am a self-healing system.', 'My vessel is strong.', 'It is done.'),
(38, 'The Vagus Nerve', 'I tone my internal system into harmony. I shift from ''survival'' to ''sovereign'' in this moment.', 'My body obeys my command to rest.', 'Order is restored.'),
(39, 'Capacity', 'I am larger than any challenge. I expand my internal space to hold more power without breaking.', 'I have the capacity for greatness.', 'And so it is.'),
(40, 'Restoration', 'I reclaim my right to deep, silent rest. I shut down the scanning mind. I am safe to let go.', 'My sleep is a sacred reset.', 'It is done.'),
(41, 'Authenticity', 'I stop performing for the world. I let my stomach soften and my mask fall.', 'I am enough exactly as I am in this stillness. I am real.', 'It is done.'),
(42, 'Decoupling', 'I sever the link between old memories and current reactions. The past has no grip on my nervous system today.', 'I am fresh. I am new.', 'It is done.'),
(43, 'Digital Sovereignty', 'I pull my eyes and my energy away from the screen. I refuse to be programmed by noise.', 'I return to my own internal signal. I am free.', 'It is done.'),
(44, 'Dropping the Shield', 'I no longer wait for the ''other shoe to drop.'' I recognize that hyper-vigilance is just a tired habit.', 'I am protected by my light, not my fear.', 'It is done.'),
(45, 'Boundary Defense', 'I witness the chaos of others without becoming it. My field is a fortress of order. I do not absorb what does not belong to me.', 'I am solid.', 'It is done.'),
(46, 'Mid-Month Integration', 'I am the master of this vessel. I see the old patterns trying to return and I simply say ''No.''', 'I am firm in my new frequency.', 'Order is restored.'),
(47, 'Flow', 'I command my physical systems to move with ease. I digest life without effort. I am not a bottleneck; I am a river.', 'Everything flows.', 'It is done.'),
(48, 'Response Mastery', 'I am not a puppet to provocation. I pause, I breathe, and I choose my stance.', 'I am the observer, never the victim of a moment.', 'It is done.'),
(49, 'Lineage Peace', 'I stop the transmission of ancestral anxiety. The buck stops with me.', 'I am the one who brings silence and safety to my bloodline.', 'It is done.'),
(50, 'Frequency of Ease', 'I release the addiction to the struggle. I stop making things hard to prove my worth.', 'I choose the path of least resistance and highest impact.', 'It is done.'),
(51, 'Presence', 'I refuse the urge to run. I stay. I sit. I breathe.', 'I am powerful enough to remain in the room with myself. I am here.', 'It is done.'),
(52, 'The Sword', 'I drop the need to fight. My power is so absolute it requires no aggression.', 'I am immovable. I am at peace.', 'Order is restored.'),
(53, 'Unfreezing', 'I shake off the stagnation. I command movement into my mind and my limbs.', 'I am not stuck; I am simply preparing for a better stride.', 'It is done.'),
(54, 'Sovereignty', 'I stop over-explaining. I stop fawning for approval. My ''No'' is a complete sentence.', 'My ''Yes'' is a sacred bond. I am sovereign.', 'It is done.'),
(55, 'Spatial Order', 'I command my environment to reflect my internal state. I clear the clutter.', 'I create a sanctuary where my nervous system can thrive.', 'It is done.'),
(56, 'Vitality', 'I am a powerhouse of life force. I instruct my body to utilize every drop of energy for my highest purpose.', 'I am vibrant. I am alive.', 'It is done.'),
(57, 'The Void', 'I am comfortable in the silence. I do not need to fill the air with noise to feel safe.', 'In the void, I hear my own truth.', 'It is done.'),
(58, 'Coherence', 'My heart and my brain are now in total sync. I feel what I know and I know what I feel.', 'I am a unified field of intelligence.', 'It is done.'),
(59, 'The Witness', 'I step back from the drama of the day. I watch the play, but I do not join the cast.', 'I am untouched by the theater of Earth School.', 'It is done.'),
(60, 'Readiness', 'I trust this vessel. I have prepared the container. I am stable, regulated, and ready to receive the commands of the field.', 'I am ready.', 'It is done.'),
(61, 'The Seal', 'I look back at 30 days of regulation. I am no longer a reactive animal; I am a conscious creator. My vessel is stable. The signal is clear.', 'Order is restored.', 'And so it is.')
on conflict (day_of_year) do update set
  title = excluded.title,
  insight = excluded.insight,
  command = excluded.command,
  seal = excluded.seal;
