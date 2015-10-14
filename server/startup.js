Meteor.startup(function () {
	
	if(Meteor.users.find().count() === 0){
		// Generate Fake Admin User
		var admin = {
			email: 'admin@admin.com',
			password: 'password123',
			profile: {
				role: 'Admin'
			}
		}
		Meteor.call("createNewUser", admin);
		// Generate Fake Member User
		// User 1
		var userOne = {
			email: 'member1@member.com',
			password: 'password123',
			profile: {
				role: 'Member'
			}
		}
		Meteor.call("createNewUser", userOne);
		
		// User 2
		var userTwo = {
			email: 'member2@member.com',
			password: 'password123',
			profile: {
				role: 'Member'
			}
		}
		Meteor.call("createNewUser", userTwo);
		
		// User 3
		var userThree = {
			email: 'member3@member.com',
			password: 'password123',
			profile: {
				role: 'Member'
			}
		}
		Meteor.call("createNewUser", userThree);
		// Generate Fake Article
		var title = "Hipser Ipsum Rocks!";
		var body = "<p style='margin-bottom: 1.1em; padding: 0px; border: 0px; font-size: 17.2px; line-height: 29.24px; font-family: Lato, sans-serif; color: rgb(68, 68, 68);'>Synth Portland hashtag, literally selfies meggings normcore sustainable Pinterest PBR&amp;B fixie Etsy cornhole four loko. Viral Pinterest sustainable Carles listicle, migas brunch Vice Etsy Banksy bitters. Organic VHS flexitarian YOLO crucifix typewriter. Irony Thundercats cred, semiotics you probably haven't heard of them beard kale chips Vice. Fashion axe pork belly farm-to-table pour-over, aesthetic Odd Future sartorial art party Blue Bottle lumbersexual. Austin post-ironic VHS bitters raw denim. Synth drinking vinegar jean shorts aesthetic.</p><p style='margin-bottom: 1.1em; padding: 0px; border: 0px; font-size: 17.2px; line-height: 29.24px; font-family: Lato, sans-serif; color: rgb(68, 68, 68);'>Sriracha kale chips vegan, High Life four dollar toast blog yr 90's literally trust fund. Tote bag mixtape paleo iPhone cray vegan. Viral mlkshk migas scenester, swag 8-bit small batch umami cliche aesthetic wolf heirloom PBR&amp;B. Lo-fi XOXO lumbersexual letterpress quinoa bicycle rights. Ennui mustache vinyl Wes Anderson. Artisan yr you probably haven't heard of them keytar butcher, brunch listicle cornhole Godard Intelligentsia heirloom taxidermy lomo stumptown narwhal. Cronut YOLO actually wolf Kickstarter banh mi Bushwick, Carles pickled XOXO put a bird on it pug stumptown freegan Brooklyn.</p><p style='margin-bottom: 1.1em; padding: 0px; border: 0px; font-size: 17.2px; line-height: 29.24px; font-family: Lato, sans-serif; color: rgb(68, 68, 68);'>Organic Blue Bottle skateboard migas, wolf letterpress hashtag. Shabby chic ugh 8-bit, locavore bicycle rights photo booth tofu keffiyeh. Aesthetic Bushwick readymade kogi vegan ennui, fashion axe selvage mlkshk yr tousled listicle. Shoreditch trust fund PBR shabby chic Schlitz viral. Portland organic freegan, biodiesel roof party fap yr Blue Bottle farm-to-table dreamcatcher Brooklyn paleo. Cray sartorial raw denim leggings mixtape kogi. Squid banjo mumblecore, leggings iPhone before they sold out church-key mlkshk.</p><p style='margin-bottom: 0px; padding: 0px; border: 0px; font-size: 17.2px; line-height: 29.24px; font-family: Lato, sans-serif; color: rgb(68, 68, 68);'>You probably haven't heard of them Echo Park meggings, asymmetrical drinking vinegar letterpress readymade leggings chia ethical +1 stumptown biodiesel actually next level. Freegan Carles organic +1, biodiesel Godard bespoke DIY locavore kale chips. IPhone fanny pack Odd Future trust fund flannel. Truffaut hashtag bespoke, XOXO sriracha next level semiotics vegan. DIY before they sold out authentic polaroid, lumbersexual Godard cronut cornhole gluten-free +1 Schlitz next level synth Blue Bottle. Beard tattooed occupy, kale chips chambray four loko paleo Intelligentsia fashion axe Neutra. Small batch hoodie Echo Park migas, sartorial 8-bit plaid DIY.</p>";
		var thumbnailURL = "http://bootstrapbay.com/blog/wp-content/uploads/2014/06/hipster-ipsum.png";
		
		var user = Accounts.findUserByEmail("admin@admin.com");
		Articles.insert({
			title: title,
			body: body,
			thumb: thumbnailURL,
			likes: 0,
			likers: [],
			comments: [],
			submitted: new Date(),
			user: user._id,
			useremail: "admin@admin.com"
		});
		// Generate Fake Comment
		var articleId = Articles.findOne({title: title});
		var comment = {
			body: "IPhone fanny pack Odd Future trust fund flannel. Truffaut hashtag bespoke, XOXO sriracha next level semiotics vegan. DIY before they sold out authentic polaroid, lumbersexual Godard cronut cornhole gluten-free +1 Schlitz next level synth Blue Bottle. Beard tattooed occupy, kale chips chambray four loko paleo Intelligentsia fashion axe Neutra. Small batch hoodie Echo Park migas, sartorial 8-bit plaid DIY.",
			articleId: articleId._id ,
			submitted: new Date(),
			likes: 0,
			likers: [],
			user: user._id,
			useremail: "admin@admin.com"
		};
		
    Meteor.call('commentInsert', comment)

	}	
});