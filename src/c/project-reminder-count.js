window.c.ProjectReminderCount = (function(m) {
    return {
        view: function(ctrl, args) {
            var project = args.resource;
            return m('#project-reminder-count.card.u-radius.u-text-center.medium.u-marginbottom-80', [
                m('.fontsize-large.fontweight-semibold', 'Nombre total de personnes qui ont cliqué sur le bouton Se souvenir de moi'),
                m('.fontsize-smaller.u-marginbottom-30', 'Un courriel de rappel est envoyé 48 heures avant la fin de la campagne'),
                m('.fontsize-jumbo', project.reminder_count)
            ]);
        }
    };
}(window.m));
