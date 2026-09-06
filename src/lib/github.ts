import { getCollection } from 'astro:content';
import type { Project } from '../consts';

interface GitHubRepoResponse {
	stargazers_count?: number;
	forks_count?: number;
}

export async function getProjectsWithLiveStars(): Promise<Project[]> {
	const projectEntries = await getCollection('projects');
	const sorted = [...projectEntries].sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100));

	return await Promise.all(
		sorted.map(async (entry) => {
			const project: Project = {
				name: entry.data.name,
				slug: entry.id,
				tagline: entry.data.tagline,
				description: entry.data.description,
				tech: entry.data.tech,
				stars: entry.data.stars,
				forks: entry.data.forks,
				github: entry.data.github,
				features: entry.data.features,
				featured: entry.data.featured,
				screenshot: entry.data.screenshot,
			};

			try {
				const repoPath = project.github.replace('https://github.com/', '');
				const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
					headers: {
						'User-Agent': 'invokevirtual-site-builder',
						Accept: 'application/vnd.github.v3+json',
					},
					signal: AbortSignal.timeout(3500),
				});

				if (res.ok) {
					const data = (await res.json()) as GitHubRepoResponse;
					return {
						...project,
						stars: data.stargazers_count ?? project.stars,
						forks: data.forks_count ?? project.forks,
					};
				}
			} catch {
				// Fallback gracefully to predefined stats on rate limits or offline
			}
			return project;
		}),
	);
}

export function calculateTotalStars(projects: Project[]): number {
	return projects.reduce((sum, p) => sum + p.stars, 0);
}

