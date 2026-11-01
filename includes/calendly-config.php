<?php
/**
 * Calendly API Configuration
 *
 * To set up:
 * 1. Log into Calendly → Integrations → API & Webhooks
 * 2. Under "Personal Access Tokens", click "Get a token now"
 * 3. Name it (e.g. "website-booking"), click Create Token
 * 4. Copy the token and paste it below
 * 5. Set your event type URI below (get it from the API or from your Calendly dashboard URL)
 */

define('CALENDLY_API_TOKEN', getenv('CALENDLY_API_TOKEN') ?: 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzg1Nzk4NjY0LCJqdGkiOiJhYzJlM2ExOS04M2Y5LTQ3Y2ItOTY0YS1lNWM0ZWY3MWUxNGUiLCJ1c2VyX3V1aWQiOiI0ZGRkODkyYi1mM2RjLTQ5MWMtOWY3Ni04OGQyYTZjMTIyNjYiLCJzY29wZSI6ImF2YWlsYWJpbGl0eTpyZWFkIGF2YWlsYWJpbGl0eTp3cml0ZSBldmVudF90eXBlczpyZWFkIGV2ZW50X3R5cGVzOndyaXRlIGxvY2F0aW9uczpyZWFkIHJvdXRpbmdfZm9ybXM6cmVhZCBzaGFyZXM6d3JpdGUgc2NoZWR1bGVkX2V2ZW50czpyZWFkIHNjaGVkdWxlZF9ldmVudHM6d3JpdGUgc2NoZWR1bGluZ19saW5rczp3cml0ZSJ9.JLRY3Kmx6LUzlhmdTv6Ivkpgr0WYwFbT-8dimq1xIJASBAGxsSul5-UKcYJaoYTAKYkNBq9INZOzA5WJQeBjvA');
define('CALENDLY_API_BASE', 'https://api.calendly.com');

// User URI (extracted from token)
define('CALENDLY_USER_URI', 'https://api.calendly.com/users/4ddd892b-f3dc-491c-9f76-88d2a6c12266');

// Event type: "30 Minute Introductory Meeting"
define('CALENDLY_EVENT_TYPE', getenv('CALENDLY_EVENT_TYPE') ?: 'https://api.calendly.com/event_types/f85ed79f-21fe-4438-80b5-3332199b8edd');
