<script lang="ts">
	import * as NavList from '@registry/ui/nav-list';
	import { Sidebar } from '@registry/ui/sidebar';
	import Calendar from '@lucide/svelte/icons/calendar';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import Inbox from '@lucide/svelte/icons/inbox';
	import Settings from '@lucide/svelte/icons/settings';
	import Users from '@lucide/svelte/icons/users';

	let collapsed = $state(false);
</script>

<div class="rounded-card shadow-card flex h-96 overflow-hidden">
	<Sidebar bind:collapsed>
		{#snippet brand()}Clínica Norte{/snippet}
		<NavList.Root>
			<NavList.Group>
				<NavList.Item href="#inbox" icon={Inbox} count={4}>Inbox</NavList.Item>
				<NavList.Item href="#calendar" icon={Calendar} current>Calendar</NavList.Item>
				<NavList.Item href="#patients" icon={Users}>Patients</NavList.Item>
			</NavList.Group>
			<NavList.Group heading="Laboratory">
				<NavList.Item href="#cultures" icon={FlaskConical} count={12}>Cultures</NavList.Item>
			</NavList.Group>
		</NavList.Root>
		{#snippet footer()}
			<NavList.Root label="Account">
				<NavList.Group>
					<NavList.Item href="#settings" icon={Settings}>Settings</NavList.Item>
				</NavList.Group>
			</NavList.Root>
		{/snippet}
	</Sidebar>
	<div class="bg-canvas text-body text-ink-muted flex-1 p-4">The page.</div>
</div>
