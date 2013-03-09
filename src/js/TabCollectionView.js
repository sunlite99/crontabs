define(["underscore", "brace", "templates", "TabView"], function(_, Brace, templates, TabView) {
	return Brace.View.extend({

		template: templates.TabCollectionView,

		events: {
			"click button.add": "addTab",
			// TODO save button should be disabled until all tabs are valid
			"click button.save": "validateAndSave"
		},

		initialize: function() {
			this.model.on("add", this.tabAdded, this);
			this.model.on("reset", this.tabsAdded, this);
			this.model.on("remove", this.tabRemoved, this);
		},

		render: function() {
			this.$el.html(this.template());
			_.defer(_.bind(function() {
				this.$el.find("input.url:first").focus();
			}, this));
		},

		// TODO addTab button should only show once first tab is valid
		addTab: function(e) {
			e.preventDefault();
			this.model.add({});
			this.focusLastTabUrl();
		},

		appendToTabContainer: function(tab) {
			this.$el.find("fieldset#tabs").append(tab);
		},

		tabAdded: function(model) {
			this.appendToTabContainer(new TabView({
				model: model
			}).render());
		},

		tabsAdded: function() {
			var html = this.model.map(function(tab) {
				return new TabView({
					model: tab
				}).render()
			});

			this.appendToTabContainer(html);
			this.focusFirstTabUrl();
		},

		tabRemoved: function(model) {
			this.$el.find("[data-tab-cid='"+ model.cid + "']").remove();
		},

		focusFirstTabUrl: function() {
			this.$el.find("input.url:first").focus();
		},

		focusLastTabUrl: function() {
			this.$el.find("input.url:last").focus();
		},

		validateAndSave: function(e) {
			e.preventDefault();
			this.model.save();
		}
	});
});