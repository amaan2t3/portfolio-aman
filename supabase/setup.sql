create table if not exists public.portfolio_content (
  id integer primary key check (id = 1),
  content jsonb not null check (jsonb_typeof(content) = 'object')
);

alter table public.portfolio_content enable row level security;

revoke all on public.portfolio_content from anon, authenticated;
grant select on public.portfolio_content to anon, authenticated;

drop policy if exists "Portfolio content is publicly readable" on public.portfolio_content;
create policy "Portfolio content is publicly readable"
  on public.portfolio_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Portfolio admins can create content" on public.portfolio_content;
drop policy if exists "Portfolio admins can update content" on public.portfolio_content;

drop function if exists public.is_portfolio_admin();
drop table if exists public.portfolio_admins;

-- Only the server uses the service-role key to write portfolio content.
-- Never expose that key to the browser or add it to a VITE_ variable.
