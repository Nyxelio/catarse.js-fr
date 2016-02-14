/**
 * window.c.ProjectReminder component
 * A component that displays a clickable project reminder element.
 * The component can be of two types: a 'link' or a 'button'
 *
 * Example:
 *  view: {
 *      return m.component(c.ProjectReminder, {project: project, type: 'button'})
 *  }
 */
window.c.ProjectReminder = ((m, models, h, c) => {
    return {
        controller: (args) => {
            let project = args.project,
                filterVM = m.postgrest.filtersVM({
                    project_id: 'eq'
                }),
                storeReminderName = 'remind_' + project().id,
                l = m.prop(false),
                popNotification = m.prop(false),
                submitReminder = () => {
                    if (!h.getUser()) {
                        h.storeAction(storeReminderName, submitReminder);
                        return h.navigateToDevise();
                    }
                    let loaderOpts = project().in_reminder ? models.projectReminder.deleteOptions(filterVM.parameters()) : models.projectReminder.postOptions({
                        project_id: project().id
                    });
                    l = m.postgrest.loaderWithToken(loaderOpts);

                    l.load().then(() => {
                        project().in_reminder = !project().in_reminder;

                        if (project().in_reminder) {
                            popNotification(true);
                            setTimeout(() => {
                                popNotification(false);
                                m.redraw();
                            }, 5000);
                        } else {
                            popNotification(false);
                        }
                    });
                };

            h.callStoredAction(storeReminderName, submitReminder);
            filterVM.project_id(project().id);

            return {
                l: l,
                submitReminder: submitReminder,
                popNotification: popNotification
            };
        },
        view: (ctrl, args) => {
            const mainClass = (args.type === 'button') ? '' : '.u-text-center.u-marginbottom-30',
                buttonClass = (args.type === 'button') ? 'w-button btn btn-terciary btn-no-border' : 'btn-link link-hidden fontsize-small',
                hideTextOnMobile = args.hideTextOnMobile || false,
                project = args.project;

            return m(`#project-reminder${mainClass}`, [
                m(`button[class="${buttonClass} ${(project().in_reminder ? 'link-hidden-success' : 'fontcolor-secondary')} fontweight-semibold"]`, {
                    onclick: ctrl.submitReminder
                }, [
                    (ctrl.l() ? 'aguarde ...' : m('span.fa.fa-clock-o', [
                        m(`span${hideTextOnMobile ? '.w-hidden-medium' : ''}`, project().in_reminder ? ' Rappel actif' : ' Prévenez-moi')
                    ]))
                ]), (ctrl.popNotification() ? m.component(c.PopNotification, {
                    message: 'Ok! Vous recevrez un email de rappel 48h avant la fin de la campagne'
                }) : '')
            ]);
        }
    };
}(window.m, window.c.models, window.c.h, window.c));
