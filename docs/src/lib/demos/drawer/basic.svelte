<script lang="ts">
	import { buttonVariants } from '@registry/ui/button';
	import * as Drawer from '@registry/ui/drawer';

	const visits = [
		{ date: '12 Nov', reason: 'Follow-up', doctor: 'Dr. Ramírez' },
		{ date: '28 Oct', reason: 'Lab results', doctor: 'Dr. Ramírez' },
		{ date: '03 Oct', reason: 'First visit', doctor: 'Dr. Ortega' }
	];
</script>

<Drawer.Root side="right">
	<Drawer.Trigger class={buttonVariants({ variant: 'outline' })}>Open patient</Drawer.Trigger>
	<Drawer.Content side="right">
		<Drawer.Header>
			<Drawer.Title>Laura Gómez</Drawer.Title>
			<Drawer.Description>34 years · ID 1 020 455 781</Drawer.Description>
		</Drawer.Header>
		<Drawer.Body>
			<ul class="flex flex-col">
				{#each visits as visit (visit.date)}
					<li class="border-line text-body flex items-baseline justify-between border-b py-2">
						<span class="text-ink">{visit.reason}</span>
						<span class="text-ink-muted">{visit.date} · {visit.doctor}</span>
					</li>
				{/each}
			</ul>
		</Drawer.Body>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Close</Drawer.Close>
			<Drawer.Close class={buttonVariants({})}>Book a visit</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
