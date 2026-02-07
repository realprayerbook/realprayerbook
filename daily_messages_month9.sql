-- Month 9: Relationships & Mirroring
-- Prayers curated by Dr. Louise Van der Velde

insert into daily_messages (day_of_year, title, insight, command, seal)
values 
(247, 'The Mirror Recognition', 'I look at my relationships without judgment. I recognize that every person in my field is a reflection of my own frequency. I stop trying to polish the mirror and start changing the source.', 'Order is restored.', 'Order is restored.'),
(248, 'Releasing External Validation', 'I withdraw my need for others to see my worth. I stop seeking permission to be powerful. I am the only one who needs to approve of my path.', 'It is done.', 'It is done.'),
(249, 'Calling in High Frequency', 'I command that my relational field be cleared of low-frequency interference. I align only with those who meet me in truth and honor.', 'I am a match for excellence.', 'It is done.'),
(250, 'Withdrawing from the Argument', 'I refuse to be a participant in low-vibration conflict. I withdraw my energy from the ''ping-pong'' of projection. I stay in my center.', 'And so it is.', 'And so it is.'),
(251, 'Sovereignty in Partnership', 'I am a whole being, not a half looking for completion. I command my relationships to be a meeting of two sovereigns, not a contract of two beggars.', 'I am complete.', 'It is done.'),
(252, 'Releasing Codependency', 'I delete the program that says I am responsible for the emotions of others. I carry my own light; they must carry theirs. I am compassionate but detached.', 'It is done.', 'It is done.'),
(253, 'The Boundary Command', 'I command my boundaries to be clear and absolute. I do not need to shout them; my frequency communicates them. I am respected because I respect myself.', 'Order is restored.', 'Order is restored.'),
(254, 'Elevating the Current', 'I command the relationships I currently have to rise to my new frequency or fall away with ease. I am not afraid of the space left behind.', 'I am evolving.', 'It is done.'),
(255, 'Ending the Rescue Fantasy', 'I stop trying to ''fix'' my partner or friends. I recognize their right to their own graduation events. I lead by example, not by intervention.', 'And so it is.', 'And so it is.'),
(256, 'The Truth Signal', 'I command that only truth may be spoken in my presence. I remove the mask of ''politeness'' and replace it with the sword of integrity.', 'I am real.', 'It is done.'),
(257, 'Reclaiming Energy from the Past', 'I sever the energetic ties to lovers and friends who no longer serve my mission. I pull my life force back from old memories.', 'I am fully here.', 'It is done.'),
(258, 'Mirroring Abundance', 'I notice the abundance and beauty in others as a reflection of my own. I celebrate their win as my own resonance.', 'I am surrounded by success.', 'It is done.'),
(259, 'Neutralizing the Antagonist', 'I see the person who triggers me as a master teacher. I ask: ''What is this showing me about my own lack of regulation?'' I take the lesson and drop the drama.', 'I take the lesson and drop the drama.', 'It is done.'),
(260, 'The Sovereign Home', 'I command my household to be a temple of resonance. No parasitic energy or resentment is permitted to dwell here. We operate in honor.', 'Order is restored.', 'Order is restored.'),
(261, 'Mid-Month Mirror Audit', 'I scan my inner circle. I prune what is dead and water what is growing. I am intentional about who I allow into my sacred space.', 'And so it is.', 'And so it is.'),
(262, 'Releasing the ''Fawn'' Response', 'I stop shrinking myself to make others comfortable. I refuse to play small to maintain a false peace.', 'I am big, I am bold, and I am here.', 'It is done.'),
(263, 'Commanding Honor', 'I command that I be treated with the honor befitting a sovereign creator. I do not ask for respect; I embody it so fully that it is the only option.', 'It is done.', 'It is done.'),
(264, 'The Silence of Sovereignty', 'I do not need to explain my ''No'' or justify my ''Yes.'' My silence is a complete and powerful signal. I am not here to be understood; I am here to be me.', 'I am not here to be understood; I am here to be me.', 'It is done.'),
(265, 'Healing the Reflection', 'I forgive the version of me that accepted less than I deserved. I change the code today. I am worthy of high-resonance, high-honor love.', 'And so it is.', 'And so it is.'),
(266, 'Withdrawing Energy from Gossip', 'I refuse to host the frequency of gossip or small-talk. I speak of visions, not people. I am a high-fidelity vessel.', 'Order is restored.', 'Order is restored.'),
(267, 'The Power of Presence', 'I am fully present with those I love. I give them my focus, not my distraction. I am the anchor of peace in every room I enter.', 'It is done.', 'It is done.'),
(268, 'Deleting the ''Abandonment'' Script', 'I recognize that the only person who can abandon me is me. I am always here for myself. The fear of loss is gone.', 'I am secure.', 'It is done.'),
(269, 'Commanding Relational Flow', 'I command that my interactions be fluid and free of friction. I attract people who ''get it'' without explanation. We flow in the same direction.', 'We flow in the same direction.', 'It is done.'),
(270, 'Sovereignty over Loneliness', 'I am comfortable in my own company. I do not use relationships to escape myself. I am my own best resonance. I am whole.', 'And so it is.', 'And so it is.'),
(271, 'The Mirror of Wealth', 'I align with people who are ahead of me, not to chase them, but to resonate with their frequency of provision. I am a match for the masters.', 'I am a match for the masters.', 'It is done.'),
(272, 'Releasing the ''Fixer'' Identity', 'I am not the family therapist or the emotional sponge. I resign from those roles today. I am simply a sovereign being.', 'It is done.', 'It is done.'),
(273, 'The Love Signal', 'I command my heart to radiate a signal of high-frequency love. This is not a ''need'' for love; it is an ''outflow'' of it. I am the source.', 'Order is restored.', 'Order is restored.'),
(274, 'Neutralizing Projection', 'When someone projects their pain onto me, I let it pass through like smoke. It has no hook in my field. I am transparent to the ego.', 'And so it is.', 'And so it is.'),
(275, 'Final Reflection Check', 'I look at my world and I see more peace, more truth, and more honor. The mirror is clearing. I am the master of the reflection.', 'It is done.', 'It is done.'),
(276, 'The Review & Seal', 'I look back at 30 days of mirroring. I am no longer a victim of my relationships; I am the architect of my resonance. I am sovereign.', 'And so it is done.', 'And so it is done.'),
(277, 'The Review', 'I stand in the center of a relational field built on honor and truth. I have changed the mirror by changing the man. I am sovereign. Order is restored.', 'Order is restored.', 'Order is restored.')
on conflict (day_of_year) do update set
  title = excluded.title,
  insight = excluded.insight,
  command = excluded.command,
  seal = excluded.seal;
