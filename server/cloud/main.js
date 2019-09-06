Parse.Cloud.beforeLogin(async request => {
    const { object: user }  = request;
    if(user.get('is_banned')) {
        throw new Error('Access denied, you have been banned.')
    }

    if(!user.get('is_active')) {
        throw new Error('Account is InActive. Please contact Administrator')
    }
});
