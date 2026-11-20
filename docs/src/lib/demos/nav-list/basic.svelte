<script lang="ts">
	import * as NavList from '@registry/ui/nav-list';
	import Calendar from '@lucide/svelte/icons/calendar';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import Inbox from '@lucide/svelte/icons/inbox';
	import Users from '@lucide/svelte/icons/users';
</script>

<NavList.Root class="w-56">
	<NavList.Group>
		<NavList.Item href="#inbox" icon={Inbox} count={4}>Inbox</NavList.Item>
		<NavList.Item href="#calendar" icon={Calendar} current>Calendar</NavList.Item>
		<NavList.Item href="#patients" icon={Users}>Patients</NavList.Item>
	</NavList.Group>
	<NavList.Group heading="Laboratory">
		<NavList.Item href="#cultures" icon={FlaskConical} count={12}>Cultures</NavList.Item>
	</NavList.Group>
</NavList.Root>
