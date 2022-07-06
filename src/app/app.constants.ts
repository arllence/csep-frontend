// export let serverurl = 'http://192.168.81.35:8000';
// export let serverurl = 'https://ienafrica.herokuapp.com';
// export let serverurl = 'https://smartbeaver.org/ienbackend';
// export let serverurl = 'https://portal-ienafrica.org/backend';
export let serverurl = 'http://127.0.0.1:8000';
// export let serverurl = 'http://51.12.248.43:5600';


export let API_VERSION = '/api/v1/';
export let loginurl = serverurl + API_VERSION + 'authentication/login';
export let signupurl = serverurl + API_VERSION + 'authentication/create-account';

export let verify_email_url = serverurl + API_VERSION + 'authentication/verify-email';
export let resend_otp_url = serverurl + API_VERSION + 'authentication/resend-otp';
export let user_reset_password_url = serverurl + API_VERSION + 'authentication/reset-user-password';
export let reset_password_page_url = serverurl + API_VERSION + 'authentication/reset-password';
export let send_password_reset_link_url = serverurl + API_VERSION + 'authentication/send-password-reset-link';

export let create_profile_url = serverurl + API_VERSION + 'account-management/create-profile';

export let create_certification_url = serverurl + API_VERSION + 'account-management/create-certification';
export let delete_certification_url = serverurl + API_VERSION + 'account-management/delete-certification';
export let get_certifications_url = serverurl + API_VERSION + 'account-management/get-certifications';

export let create_association_url = serverurl + API_VERSION + 'account-management/create-association';
export let delete_association_url = serverurl + API_VERSION + 'account-management/delete-association';
export let get_associations_url = serverurl + API_VERSION + 'account-management/get-associations';


export let create_hobby_url = serverurl + API_VERSION + 'account-management/create-hobby';
export let delete_hobby_url = serverurl + API_VERSION + 'account-management/delete-hobby';
export let get_hobbies_url = serverurl + API_VERSION + 'account-management/get-hobbies';

export let get_profile_picture_url = serverurl + API_VERSION + 'account-management/get-profile-picture';

export let check_completed_profile = serverurl + API_VERSION + 'account-management/check-completed-profile';
export let get_complete_profile = serverurl + API_VERSION + 'account-management/user-profile';
export let upload_document_url = serverurl + API_VERSION + 'account-management/upload-document';



// csep
export let fetch_positions_url = serverurl + API_VERSION + 'voting/fetch-positions';
export let create_candidate_position_url = serverurl + API_VERSION + 'voting/create-candidate-position';
export let fetch_candidate_positions_url = serverurl + API_VERSION + 'voting/fetch-candidate-positions';
export let fetch_all_candidate_positions_url = serverurl + API_VERSION + 'voting/fetch-all-candidate-positions';
export let fetch_candidate_position_url = serverurl + API_VERSION + 'voting/fetch-candidate-position';
export let delete_candidate_position_url = serverurl + API_VERSION + 'voting/delete-candidate-position';
export let approve_candidate_position_url = serverurl + API_VERSION + 'voting/approve-candidate-position';
export let fetch_candidates_url = serverurl + API_VERSION + 'voting/fetch-candidates';
export let fetch_candidates_results_url = serverurl + API_VERSION + 'voting/fetch-candidates-results';

export let create_post_url = serverurl + API_VERSION + 'voting/create-post';
export let create_comment_url = serverurl + API_VERSION + 'voting/create-comment';
export let create_comment_child_url = serverurl + API_VERSION + 'voting/create-comment-child';
export let delete_post_url = serverurl + API_VERSION + 'voting/delete-post';
export let delete_comment_url = serverurl + API_VERSION + 'voting/delete-comment';
export let delete_comment_child_url = serverurl + API_VERSION + 'voting/delete-comment-child';
export let fetch_posts_url = serverurl + API_VERSION + 'voting/fetch-posts';
export let create_like_url = serverurl + API_VERSION + 'voting/create-like';
export let create_seen_url = serverurl + API_VERSION + 'voting/create-seen';


export let create_voter_token_url = serverurl + API_VERSION + 'voting/create-voter-token';
export let check_voter_token_url = serverurl + API_VERSION + 'voting/check-voter-token';
export let award_token_url = serverurl + API_VERSION + 'voting/award-token';
export let create_vote_url = serverurl + API_VERSION + 'voting/create-vote';
export let check_has_voted_url = serverurl + API_VERSION + 'voting/check-has-voted';





























export let support_services_url = serverurl + API_VERSION + 'admin-management/support-services';
export let industries_url = serverurl + API_VERSION + 'admin-management/industries';
export let development_stages_url = serverurl + API_VERSION + 'admin-management/development-stages';
export let intellectual_properties_url = serverurl + API_VERSION + 'admin-management/intellectual-properties';
export let hubs_url = serverurl + API_VERSION + 'admin-management/hubs';
export let innovation_skills_url = serverurl + API_VERSION + 'admin-management/innovation-skills';
export let employment_status_url = serverurl + API_VERSION + 'admin-management/employment-status';

export let innovation_id_url = serverurl + API_VERSION + 'innovation/innovation-id';
export let create_innovation_url = serverurl + API_VERSION + 'innovation/create-innovation';
export let innovation_details_url = serverurl + API_VERSION + 'innovation/innovation-details';
export let update_innovation_details_url = serverurl + API_VERSION + 'innovation/update-innovation-details';
export let innovation_information_url = serverurl + API_VERSION + 'innovation/innovation-information';
export let innovation_additional_details_url = serverurl + API_VERSION + 'innovation/innovation-additional-details';
export let my_innovations_url = serverurl + API_VERSION + 'innovation/my-innovations';
export let pending_final_review_url = serverurl + API_VERSION + 'innovation/pending-final-review';
export let completed_final_review_url = serverurl + API_VERSION + 'innovation/completed-final-review';
export let innovation_review_url = serverurl + API_VERSION + 'innovation/innovation-review';
export let complete_innovation_url = serverurl + API_VERSION + 'innovation/complete-innovation';
export let get_innovation_details_url = serverurl + API_VERSION + 'innovation/get-innovation-details';
export let get_innovation_information_url = serverurl + API_VERSION + 'innovation/get-innovation-information';
export let get_innovation_additional_details_url = serverurl + API_VERSION + 'innovation/get-innovation-additional-details';
export let get_innovations_url = serverurl + API_VERSION + 'innovation/innovations';
export let get_innovation_url = serverurl + API_VERSION + 'innovation/innovation';
export let get_assigned_innovations_url = serverurl + API_VERSION + 'innovation/assigned-innovations';
export let filter_innovations_url = serverurl + API_VERSION + 'innovation/filter-innovations';

export let innovator_has_read_reviews_url = serverurl + API_VERSION + 'innovation/innovator-has-read-reviews';

export let delete_support_service_url = serverurl + API_VERSION + 'innovation/remove-support-service';

export let list_staff_url = serverurl + API_VERSION + 'account-management/filter-by-email';
export let get_user_details_url = serverurl + API_VERSION + 'account-management/get-user-details';
export let get_users_url = serverurl + API_VERSION + 'account-management/fetch-users';

export let create_evaluation_url = serverurl + API_VERSION + 'evaluation/create-evaluation';
export let is_evaluated_url = serverurl + API_VERSION + 'evaluation/is-evaluated';
export let evaluated_innovation_url = serverurl + API_VERSION + 'evaluation/evaluated-innovation';

export let create_note_url = serverurl + API_VERSION + 'evaluation/create-note';
export let get_notes_url = serverurl + API_VERSION + 'evaluation/get-notes';
export let delete_note_url = serverurl + API_VERSION + 'evaluation/delete-note';

export let create_group_url = serverurl + API_VERSION + 'evaluation/create-group';
export let get_groups_url = serverurl + API_VERSION + 'evaluation/get-groups';

export let create_review_url = serverurl + API_VERSION + 'evaluation/create-review';
export let create_final_evaluators_comment_url = serverurl + API_VERSION + 'evaluation/create-final-evaluators-comment';
export let get_my_innovation_reviews_url = serverurl + API_VERSION + 'evaluation/get-my-innovation-reviews';

export let create_innovation_manager_review = serverurl + API_VERSION + 'evaluation/create-innovation-manager-review';
export let get_innovation_manager_review_url = serverurl + API_VERSION + 'evaluation/get-innovation-manager-review';
export let create_final_im_review_url = serverurl + API_VERSION + 'evaluation/create-final-innovation-manager-review';

export let create_assignment_url = serverurl + API_VERSION + 'evaluation/create-assignment';
export let get_assignments_url = serverurl + API_VERSION + 'evaluation/get-assignments';
export let get_innovator_assignments_url = serverurl + API_VERSION + 'evaluation/get-innovator-assignments';
export let delete_assignment_url = serverurl + API_VERSION + 'evaluation/delete-assignment';

export let create_assignment_response_url = serverurl + API_VERSION + 'evaluation/create-assignment-response';

export let get_notifications_url = serverurl + API_VERSION + 'evaluation/get-notifications';
export let mark_notifications_as_read_url = serverurl + API_VERSION + 'evaluation/mark-notifications-as-read';

export let general_counts_url = serverurl + API_VERSION + 'analytics/general-counts';
export let junior_counts_url = serverurl + API_VERSION + 'analytics/junior-counts';
export let monthly_user_registration_url = serverurl + API_VERSION + 'analytics/monthly-user-registration';
export let user_by_gender_url = serverurl + API_VERSION + 'analytics/user-by-gender';
export let im_analytics_url = serverurl + API_VERSION + 'analytics/im-analytics';

export let award_user_role_url = serverurl + API_VERSION + 'superuser/award-role';
export let revoke_user_role_url = serverurl + API_VERSION + 'superuser/revoke-role';
export let user_registration_form_url = serverurl + API_VERSION + 'superuser/user-registration-form';
export let create_user_url = serverurl + API_VERSION + 'superuser/create-user';
export let swap_user_department_url = serverurl + API_VERSION + 'superuser/swap-user-department';
export let suspend_user_url = serverurl + API_VERSION + 'superuser/suspend-user';
export let unsuspend_user_url = serverurl + API_VERSION + 'superuser/un-suspend-user';
export let reset_password_url = serverurl + API_VERSION + 'superuser/reset-user-password';
export let change_password_url = serverurl + API_VERSION + 'account-management/change-password';
export let edit_user_url = serverurl + API_VERSION + 'superuser/edit-user';

export let list_user_roles = serverurl + API_VERSION + 'account-management/list-roles';
export let fetch_roles_url = serverurl + API_VERSION + 'account-management/fetch-roles';
export let refetch_roles_url = serverurl + API_VERSION + 'account-management/re-fetch-roles';
export let list_users_with_role = serverurl + API_VERSION + 'account-management/list-users-with-role';
export let get_user_roles_url = serverurl + API_VERSION + 'account-management/list-user-roles';

