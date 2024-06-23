<script lang="ts">
	import Field from './Field.svelte';
	import { z } from 'zod';
	import { DateTime, type DurationObjectUnits } from 'luxon';

	let today = DateTime.now();
	let day: number | null = null;
	let month: number | null = null;
	let year: number | null = null;
	let errors: Record<string, string[]> = {};
	let diff: DurationObjectUnits = {};
	let days: number | undefined = undefined;
	let months: number | undefined = undefined;
	let years: number | undefined = undefined;

	const schema = z
		.object({
			day: z.number().min(1, 'This field is required').max(31, 'Must be a valid day'),
			month: z.number().min(1, 'This field is required').max(12, 'Must be a valid month'),
			year: z
				.number()
				.refine((val) => val > 0, { message: 'This field is required' })
				.refine((val) => val >= 1900, { message: 'Must be after 1900' })
		})
		.superRefine(({ year, month, day }, ctx) => {
			const valDate = DateTime.fromObject({ year, month, day });

			if (day < 0 || day > 31) return true;
			if (month < 0 || month > 12) return true;
			if (year < 1900 || new Date().getFullYear()) return true;

			if (!valDate.isValid) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_date,
					path: ['root', 1],
					message: 'Must be a valid date',
					fatal: true
				});

				return z.NEVER;
			}

			return true;
		})
		.superRefine(({ year, month, day }, ctx) => {
			const valDate = DateTime.fromObject({ year, month, day });

			if (valDate > today) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['year', 1],
					message: 'Must be in the past',
					fatal: true
				});

				return z.NEVER;
			}

			return true;
		});

	type DataFormData = z.infer<typeof schema>;

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		// Validate form data
		const formData: DataFormData = {
			day: day ?? 0,
			month: month ?? 0,
			year: year ?? 0
		};
		const result = schema.safeParse(formData);

		if (!result.success) {
			errors = result.error.flatten().fieldErrors;
			return;
		}

		diff = today.diff(DateTime.fromObject(formData), ['years', 'months', 'days']).toObject() as {
			years: number;
			months: number;
			days: number;
		};
		years = diff.years;
		months = diff.months;
		days = diff.days;
		errors = {};
	};
</script>

<article
	class="bg-white place-self-start md:place-self-center rounded-container rounded-br-container-big p-6 md:p-14 container shadow-sm"
>
	<section>
		<form
			on:submit={handleSubmit}
			class="grid md:grid-cols-4 mb-6 md:mb-0 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-0"
		>
			<Field label="DAY" placeholder="DD" error={errors.day?.[0] ?? null} bind:value={day} />
			<Field label="MONTH" placeholder="MM" error={errors.month?.[0] ?? null} bind:value={month} />
			<Field
				label="YEAR"
				placeholder="YYYY"
				error={errors.year?.[0] ?? null}
				bind:value={year}
				min={1900}
			/>
			{#if errors.root}
				<div class="text-error text-label-error italic mt-2 col-span-3">{errors.root}</div>
			{/if}
			<div
				class="col-span-4 flex justify-center md:justify-end relative isolate before:h-px before:absolute before:bg-neutral-100 before:w-full before:top-1/2 before:left-0 before:translate-y-1/2 before:-z-10"
			>
				<button
					class="aspect-square size-[fluid(4rem,6rem)] flex bg-accent text-white rounded-[100vmax] transition-all hover:bg-black"
					type="submit"
					aria-label="submit"
				>
					<svg
						class="m-auto size-[fluid(1.5rem,2.75rem)]"
						aria-hidden="true"
						width="46"
						height="44"
						viewBox="0 0 46 44"
						><g fill="none" stroke="#FFF" stroke-width="2"
							><path
								d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"
							/></g
						></svg
					>
				</button>
			</div>
		</form>
		<div class="text-output italic">
			<span class="text-accent">
				{years ? years.toString().padStart(2, '0') : '--'}
			</span> years
		</div>
		<div class="text-output italic">
			<span class="text-accent">
				{months ? months.toString().padStart(2, '0') : '--'}
			</span> months
		</div>
		<div class="text-output italic">
			<span class="text-accent">
				{days ? days.toFixed().toString().padStart(2, '0') : '--'}
			</span> days
		</div>
	</section>
</article>
