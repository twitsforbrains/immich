import { test, expect, type Page, Locator } from '@playwright/test';

const BASE_URL = 'http://localhost:2283';
const LOGIN_PAGE = BASE_URL + '/auth/login';
const PHOTOS_PAGE = BASE_URL + '/photos';
const SHARING_PAGE = BASE_URL + '/sharing';
const FAVORITES_PAGE = BASE_URL + '/favorites';
const ALBUMS_PAGE = BASE_URL + '/albums';
const ADMIN_PAGE_USERS = BASE_URL + '/admin/user-management';
const ADMIN_PAGE_JOBS = BASE_URL + '/admin/jobs-status';
const ADMIN_PAGE_SETTINGS = BASE_URL + '/admin/system-settings';
const ADMIN_PAGE_SERVER_STATS = BASE_URL + '/admin/server-status';

test.describe('Existing user with existing assets', async () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(LOGIN_PAGE);
		await expect(page).toHaveTitle('Login - Immich');

		await page.fill('input[name="email"]', 'testuser@email.com');
		await page.fill('input[name="password"]', 'password');
		await page.click('button[type="submit"]');

		await expect(page).toHaveURL(PHOTOS_PAGE);
		await expect(page).toHaveTitle('Photos - Immich');
	});

	test.describe('should be able to navigate to pages', async () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(PHOTOS_PAGE);
		});

		test('go to sharing page', async ({ page }) => {
			await page.getByText('Sharing').click();
			await expect(page).toHaveURL(SHARING_PAGE);
		});

		test('go to favorites page', async ({ page }) => {
			await page.getByText('Favorites').click();
			await expect(page).toHaveURL(FAVORITES_PAGE);
		});

		test('go to album page', async ({ page }) => {
			await page.getByText('Albums').click();
			await expect(page).toHaveURL(ALBUMS_PAGE);
		});

		test('go to admin page', async ({ page }) => {
			await page.getByText('Administration').click();
			await expect(page).toHaveURL(ADMIN_PAGE_USERS);
		});
	});

	test.describe('should be able to navigate to admin pages', async () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(ADMIN_PAGE_USERS);
		});

		test('go to admin/user management page', async ({ page }) => {
			await page.getByText('Users', { exact: true }).click();
			await expect(page).toHaveURL(ADMIN_PAGE_USERS);
		});

		test('go to admin/jobs page', async ({ page }) => {
			await page.getByText('Jobs', { exact: true }).click();
			await expect(page).toHaveURL(ADMIN_PAGE_JOBS);
		});

		test('go to admin/settings page', async ({ page }) => {
			await page.getByText('Settings', { exact: true }).click();
			await expect(page).toHaveURL(ADMIN_PAGE_SETTINGS);
		});

		test('go to admin/server-status page', async ({ page }) => {
			await page.getByText('Server Stats', { exact: true }).click();
			await expect(page).toHaveURL(ADMIN_PAGE_SERVER_STATS);
		});
	});

	test.describe('should be able to see and view photo', async () => {
		let thumbnails: Locator;
		let assetViewer: Locator;

		test.beforeEach(async ({ page }) => {
			thumbnails = page.getByTestId('immich-thumbnail-testid');
			assetViewer = page.getByTestId('asset-viewer-testid');
		});

		test('see photos on timeline', async ({ page }) => {
			expect(thumbnails).toBeTruthy();
			await expect(assetViewer).not.toBeVisible();
		});

		test('view a photo', async ({ page }) => {
			await thumbnails.nth(0).click();
			await expect(assetViewer).toBeVisible();
		});
	});
});
