<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import FileText from '@lucide/svelte/icons/file-text';
	import Mail from '@lucide/svelte/icons/mail';
	import Sheet from '@lucide/svelte/icons/sheet';
	import {
		Menu,
		MenuContent,
		MenuGroup,
		MenuGroupLabel,
		MenuItem,
		MenuSeparator,
		MenuSubmenu,
		MenuSubmenuTrigger,
		MenuTrigger
	} from '@registry/ui/menu';
</script>

<Menu>
	<MenuTrigger>Export <ChevronDown /></MenuTrigger>
	<MenuContent>
		<MenuGroup>
			<MenuGroupLabel>Download</MenuGroupLabel>
			<MenuItem icon={FileText}>PDF</MenuItem>
			<MenuItem icon={Sheet}>Spreadsheet</MenuItem>
		</MenuGroup>
		<MenuSeparator />
		<MenuSubmenu>
			<MenuSubmenuTrigger icon={Mail}>Send to</MenuSubmenuTrigger>
			<MenuContent>
				<MenuItem>The patient</MenuItem>
				<MenuItem>The insurer</MenuItem>
				<MenuItem>The doctor</MenuItem>
			</MenuContent>
		</MenuSubmenu>
	</MenuContent>
</Menu>
