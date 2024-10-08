import type { Uri } from 'vscode';
import type { BrowseRepoAtRevisionCommandArgs } from '../commands/browseRepoAtRevision';
import type { GitCommandsCommandArgs, GitCommandsCommandArgsWithCompletion } from '../commands/gitCommands';
import { Commands } from '../constants.commands';
import { defer } from '../system/promise';
import { executeCommand, executeEditorCommand } from '../system/vscode/command';

export async function executeGitCommand(args: GitCommandsCommandArgs): Promise<void> {
	const deferred = defer<void>();
	void (await executeCommand<GitCommandsCommandArgsWithCompletion>(Commands.GitCommands, {
		...args,
		completion: deferred,
	}));
	return deferred.promise;
}

export async function browseAtRevision(uri: Uri, options?: { before?: boolean; openInNewWindow?: boolean }) {
	void (await executeEditorCommand<BrowseRepoAtRevisionCommandArgs>(Commands.BrowseRepoAtRevision, undefined, {
		uri: uri,
		before: options?.before,
		openInNewWindow: options?.openInNewWindow,
	}));
}
