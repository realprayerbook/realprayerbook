-- Sample Data for Daily Messages
-- Run this in your Supabase SQL Editor to test the system

insert into daily_messages (day_of_year, title, insight, command, seal)
values 
(39, 'Expanding Vision', 'Your reality is limited only by the boundaries of your imagination.', 'I command my vision to expand beyond the visible horizon.', 'The light of truth reveals all. And so it is done.'),
(40, 'Pure Abundance', 'The universe is a fountain of infinite supply, waiting for your vessel to open.', 'I command the floodgates of abundance to open within my awareness.', 'The flow is eternal. And so it is done.'),
(41, 'Sovereign Presence', 'You are the king of your internal castle. No external force has power unless granted.', 'I command my presence to remain central and unshakeable today.', 'Order is restored. And so it is done.')
on conflict (day_of_year) do update set
  title = excluded.title,
  insight = excluded.insight,
  command = excluded.command,
  seal = excluded.seal;
