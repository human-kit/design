<script lang="ts">
	import { Button } from '@registry/ui/button';
	import * as Card from '@registry/ui/card';
</script>

<Card.Root class="max-w-sm">
	<Card.Header>
		<Card.Title>Next transfer</Card.Title>
		<Card.Description>Frozen embryo, day 5</Card.Description>
		<Card.Action><Button size="sm" variant="ghost">Edit</Button></Card.Action>
	</Card.Header>
	<Card.Content class="text-ink-muted">
		Thursday 26 November, 9:30. Bring the signed consent and arrive with a full bladder.
	</Card.Content>
	<Card.Footer class="justify-end">
		<Button size="sm" variant="outline">Reschedule</Button>
		<Button size="sm">Confirm</Button>
	</Card.Footer>
</Card.Root>
