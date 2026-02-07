-- Month 3: Spiritual Hygiene & Sovereignty
-- Prayers curated by Dr. Louise Van der Velde

insert into daily_messages (day_of_year, title, insight, command, seal)
values 
(62, 'The Extraction', 'I recognize where my energy has been leaking into the lives and dramas of others. I command a total extraction of my life force from all external sources.', 'I pull my power back to my center.', 'Order is restored.'),
(63, 'Closing the Portals', 'I close every door I opened unconsciously through fear, curiosity, or weakness. I seal my field against all that is not of my highest light.', 'My container is now airtight.', 'And so it is.'),
(64, 'Removing the Overlays', 'I peel back the layers of ''New Age'' noise and false promises. I stop looking for answers in the words of others.', 'I remove every parasitic overlay between me and my source.', 'I am direct. I am clear.'),
(65, 'Digital Extraction', 'I withdraw my focus from the digital hive mind. I am not a battery for social media or news cycles.', 'I pull my attention back into my physical vessel.', 'I am sovereign in my thoughts.'),
(66, 'The Shield of Light', 'I do not hope for protection; I command it. I activate a shield of high-frequency light around my field. Only truth and honor may enter.', 'All else is reflected back to its source.', 'It is done.'),
(67, 'Revoking Consent', 'I revoke my consent to any system, group, or frequency that drains my vitality. I am not a victim of ''the world.''', 'I am a sovereign creator who chooses where my energy goes.', 'It is done.'),
(68, 'Clearing the Workspace', 'I command the space where I create to be cleared of all stagnant energy. I push out the heavy and call in the clear.', 'My environment is now a reflection of my internal order.', 'It is done.'),
(69, 'Identifying the Parasite', 'I see the habits and people that feed off my stress. I name them, and I withdraw the fuel.', 'I refuse to be a host for low-frequency drama.', 'I am free.'),
(70, 'Ending the Search', 'I stop the desperate search for the next ''secret'' or ''guru.'' I recognize that the search itself is an interference.', 'I sit in my own knowing. I am the authority.', 'It is done.'),
(71, 'Cutting the Chords', 'I visualize all energetic chords connecting me to past lovers, enemies, or employers. I command these chords to be severed now.', 'I belong to no one but myself.', 'It is done.'),
(72, 'Clearing the Throat', 'I remove the interference in my expression. I stop swallowing my truth to keep the peace.', 'I command my voice to be a clear signal of my sovereign intent.', 'It is done.'),
(73, 'Frequency Check', 'I audit my environment. I remove the objects, music, and media that lower my vibration. I am the gatekeeper of my own frequency.', 'Order is restored.', 'It is done.'),
(74, 'Neutralizing the News', 'I refuse to be triggered by the theater of the world. I see the ''noise'' for what it is: a distraction from my mission.', 'I remain neutral. I remain focused.', 'It is done.'),
(75, 'The False Light', 'I sharpen my discernment. I see through the ''false light'' that masks manipulation with kindness.', 'I trust my gut over the performance.', 'I am not fooled.'),
(76, 'Mid-Month Clearing', 'I perform a deep sweep of my internal field. Any residue of the past two weeks is flushed out now.', 'I am empty of interference and full of myself.', 'It is done.'),
(77, 'Reclaiming the Crown', 'I command my mind to stop hosting thoughts that are not mine. I evict the voices of critics, parents, and society.', 'I reclaim the crown of my own consciousness.', 'It is done.'),
(78, 'Dissolving the Ego-Trap', 'I see where my own ego has created interference through pride or fear. I dissolve the trap. I move from ''I'' to ''Source.''', 'I am a clear channel.', 'It is done.'),
(79, 'Clearing the Bloodline Static', 'I recognize that my family’s fears are not my own. I clear the static of their expectations from my field.', 'I am the sovereign branch of this tree.', 'It is done.'),
(80, 'The Command of Silence', 'I enter the silence and command it to stay. I refuse to fill the space with ''spiritual'' noise.', 'In the stillness, the interference has nowhere to hide.', 'It is done.'),
(81, 'Withdrawing from Conflict', 'I withdraw from every argument that does not serve my growth. I refuse to give my energy to those who only want to win.', 'I win by remaining sovereign.', 'It is done.'),
(82, 'Shielding the Heart', 'I protect my heart from the projections of the wounded. I do not take on their pain as my project.', 'I am compassionate but detached. My field is clear.', 'It is done.'),
(83, 'Deleting the ''Lack'' Program', 'I identify the program of ''not enough'' as an external virus. I command it to be deleted from my system.', 'I am a vessel of abundance.', 'And so it is.'),
(84, 'Cleaning the Dream State', 'I command my subconscious to be cleared while I sleep. No interference may enter my dreams.', 'I wake up fresh, sovereign, and aligned.', 'It is done.'),
(85, 'Reclaiming Time', 'I withdraw my energy from the past and the future. Both are interferences to the power of Now.', 'I am fully present. I am fully here.', 'It is done.'),
(86, 'The Wall of Truth', 'I speak my truth as a command to the field. Any interference that cannot match my frequency must leave.', 'I am a wall of integrity.', 'It is done.'),
(87, 'Breaking the Spell', 'I break every spell of inadequacy I have cast upon myself. I am not ''broken'' or ''in need of fixing.''', 'I am a master in training. The spell is broken.', 'It is done.'),
(88, 'Clearing Financial Static', 'I remove the noise of ''worry'' from my money. I command my finances to reflect order and flow.', 'I am not distracted by the numbers; I am focused on the value.', 'It is done.'),
(89, 'Sovereignty of Soul', 'I declare that my soul is the only pilot of this vessel. No external entity, frequency, or program has permission to lead me.', 'I am the captain.', 'It is done.'),
(90, 'The Final Flush', 'I flush out the last remaining bits of interference. I am a clean, polished mirror. I reflect only the light of my own divinity.', 'Order is restored.', 'It is done.'),
(91, 'The Seal of Sovereignty', 'I look back at 30 days of clearing. I am lighter, sharper, and more potent. The noise is gone; the signal is loud.', 'I am sovereign.', 'And so it is done.'),
(92, 'The Review', 'I stand in the center of a cleared field. I am no longer a host for parasites or a victim of overlays.', 'I am a pure, sovereign signal. I am ready to manifest from the void.', 'And so it is.')
on conflict (day_of_year) do update set
  title = excluded.title,
  insight = excluded.insight,
  command = excluded.command,
  seal = excluded.seal;
