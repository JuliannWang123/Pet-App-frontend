if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/julianwang/.gradle/caches/8.10.2/transforms/8be93bdf47fee54855c5fbf0680faee1/transformed/hermes-android-0.76.5-release/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/julianwang/.gradle/caches/8.10.2/transforms/8be93bdf47fee54855c5fbf0680faee1/transformed/hermes-android-0.76.5-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

